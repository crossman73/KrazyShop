const productService = require('./productService');
const externalService = require('./externalService');

const comparisonService = {
  async compareProducts(productIds) {
    const products = [];
    
    // Fetch all products
    for (const id of productIds) {
      const product = await productService.getProductById(id);
      if (product) {
        products.push(product);
      }
    }

    if (products.length < 2) {
      throw new Error('At least 2 valid products are required for comparison');
    }

    // Calculate comparison metrics
    const prices = products.map(p => p.price);
    const cheapest = products.reduce((prev, current) => 
      prev.price < current.price ? prev : current
    );
    const mostExpensive = products.reduce((prev, current) => 
      prev.price > current.price ? prev : current
    );
    const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    // Group by category for better comparison
    const categories = {};
    products.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = [];
      }
      categories[product.category].push(product);
    });

    return {
      products,
      comparison: {
        cheapest,
        mostExpensive,
        averagePrice: Math.round(averagePrice * 100) / 100,
        priceRange: mostExpensive.price - cheapest.price,
        savings: mostExpensive.price - cheapest.price
      },
      categories,
      summary: {
        totalProducts: products.length,
        uniqueCategories: Object.keys(categories).length,
        recommendation: cheapest.id // Recommend the cheapest option
      }
    };
  },

  async comparePrices(productId) {
    const product = await productService.getProductById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Get prices from external sources
    const externalPrices = await externalService.getExternalPrices(productId);
    
    const allPrices = [
      {
        source: 'KrazyShop',
        price: product.price,
        url: `/products/${productId}`,
        inStock: true
      },
      ...externalPrices
    ];

    // Find best price
    const bestPrice = allPrices.reduce((best, current) => 
      current.inStock && current.price < best.price ? current : best
    );

    // Calculate potential savings
    const maxPrice = Math.max(...allPrices.filter(p => p.inStock).map(p => p.price));
    const savings = maxPrice - bestPrice.price;

    return {
      product,
      prices: allPrices,
      bestPrice,
      savings: Math.round(savings * 100) / 100,
      avgPrice: Math.round((allPrices.reduce((sum, p) => sum + p.price, 0) / allPrices.length) * 100) / 100,
      priceRange: {
        min: Math.min(...allPrices.filter(p => p.inStock).map(p => p.price)),
        max: maxPrice
      }
    };
  },

  async getRecommendations(filters = {}) {
    let products = await productService.getAllProducts(filters);
    
    // Sort by best value (considering price and popularity)
    products = products.sort((a, b) => {
      // Simple recommendation algorithm - in production this would be more sophisticated
      const aScore = this.calculateProductScore(a);
      const bScore = this.calculateProductScore(b);
      return bScore - aScore;
    });

    // Return top 10 recommendations
    return products.slice(0, 10).map(product => ({
      ...product,
      recommendationScore: this.calculateProductScore(product),
      reason: this.getRecommendationReason(product)
    }));
  },

  calculateProductScore(product) {
    // Simple scoring algorithm - lower price gets higher score
    // In production, this would include user preferences, reviews, ratings, etc.
    const baseScore = 100;
    const priceMultiplier = 1000 / product.price; // Lower price = higher multiplier
    return Math.round((baseScore + priceMultiplier) * 100) / 100;
  },

  getRecommendationReason(product) {
    if (product.price < 500) {
      return 'Great value for money';
    } else if (product.price > 1000) {
      return 'Premium quality product';
    } else {
      return 'Good balance of price and features';
    }
  }
};

module.exports = comparisonService;