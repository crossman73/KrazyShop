const axios = require('axios');
const config = require('../config/app');
const logger = require('../utils/logger');
const productService = require('./productService');

// Circuit breaker pattern implementation
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }

  async execute(operation) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
    }
  }
}

// Circuit breakers for different APIs
const productApiBreaker = new CircuitBreaker();
const priceApiBreaker = new CircuitBreaker();

const externalService = {
  async syncProductsFromExternalApis() {
    const results = {
      syncedCount: 0,
      errors: []
    };

    try {
      // Sync from product API
      const productApiData = await this.fetchFromProductApi();
      if (productApiData && productApiData.length > 0) {
        await productService.bulkCreateProducts(productApiData);
        results.syncedCount += productApiData.length;
        logger.info(`Synced ${productApiData.length} products from external product API`);
      }
    } catch (error) {
      logger.error('Failed to sync from product API:', error);
      results.errors.push(`Product API: ${error.message}`);
    }

    return results;
  },

  async updatePricesFromExternalApis() {
    const results = {
      updatedCount: 0,
      errors: []
    };

    try {
      const products = await productService.getAllProducts();
      
      for (const product of products) {
        try {
          const externalPrices = await this.getExternalPrices(product.id);
          if (externalPrices.length > 0) {
            // Update with the best external price
            const bestExternalPrice = Math.min(...externalPrices.map(p => p.price));
            if (bestExternalPrice < product.price) {
              await productService.updateProduct(product.id, { 
                price: bestExternalPrice,
                priceUpdatedAt: new Date().toISOString()
              });
              results.updatedCount++;
            }
          }
        } catch (error) {
          logger.error(`Failed to update price for product ${product.id}:`, error);
          results.errors.push(`Product ${product.id}: ${error.message}`);
        }
      }
    } catch (error) {
      logger.error('Failed to update prices:', error);
      results.errors.push(error.message);
    }

    return results;
  },

  async fetchFromProductApi() {
    return await productApiBreaker.execute(async () => {
      const response = await axios.get(config.externalApis.productApi.url, {
        headers: {
          'Authorization': `Bearer ${config.externalApis.productApi.key}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      // Transform external API format to our internal format
      return response.data.map(item => ({
        name: item.title || item.name,
        price: parseFloat(item.price),
        category: item.category?.toLowerCase() || 'unknown',
        description: item.description || '',
        imageUrl: item.image || item.imageUrl || '',
        externalId: item.id
      }));
    });
  },

  async getExternalPrices(productId) {
    const prices = [];

    // Try to get prices from price comparison API
    try {
      const priceData = await priceApiBreaker.execute(async () => {
        const response = await axios.get(
          `${config.externalApis.priceApi.url}/prices/${productId}`,
          {
            headers: {
              'Authorization': `Bearer ${config.externalApis.priceApi.key}`,
              'Content-Type': 'application/json'
            },
            timeout: 5000
          }
        );
        return response.data;
      });

      if (priceData && priceData.prices) {
        prices.push(...priceData.prices.map(p => ({
          source: p.retailer || 'External',
          price: parseFloat(p.price),
          url: p.url || '',
          inStock: p.inStock !== false
        })));
      }
    } catch (error) {
      logger.warn(`Failed to fetch external prices for product ${productId}:`, error.message);
      
      // Fallback to mock data for demonstration
      prices.push(
        {
          source: 'RetailerA',
          price: Math.random() * 100 + 50,
          url: 'https://retailera.com/product',
          inStock: true
        },
        {
          source: 'RetailerB',
          price: Math.random() * 100 + 60,
          url: 'https://retailerb.com/product',
          inStock: true
        }
      );
    }

    return prices;
  },

  async checkExternalApiStatus() {
    const status = {
      productApi: await this.checkApiHealth(config.externalApis.productApi.url),
      priceApi: await this.checkApiHealth(config.externalApis.priceApi.url)
    };

    return status;
  },

  async checkApiHealth(apiUrl) {
    const startTime = Date.now();
    
    try {
      await axios.get(`${apiUrl}/health`, { timeout: 5000 });
      return {
        status: 'healthy',
        responseTime: Date.now() - startTime
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        responseTime: Date.now() - startTime,
        error: error.message
      };
    }
  },

  // Retry mechanism with exponential backoff
  async retryOperation(operation, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries) {
          throw error;
        }
        
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        logger.warn(`Operation failed, retrying in ${delay}ms... (attempt ${attempt}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
};

module.exports = externalService;