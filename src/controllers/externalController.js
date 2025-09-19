const externalService = require('../services/externalService');
const logger = require('../utils/logger');

const externalController = {
  async syncProducts(req, res, next) {
    try {
      logger.info('Starting product sync from external APIs');
      const result = await externalService.syncProductsFromExternalApis();
      
      res.json({
        message: 'Product sync completed',
        syncedCount: result.syncedCount,
        errors: result.errors || []
      });
    } catch (error) {
      logger.error('Error syncing products:', error);
      next(error);
    }
  },

  async updatePrices(req, res, next) {
    try {
      logger.info('Starting price update from external APIs');
      const result = await externalService.updatePricesFromExternalApis();
      
      res.json({
        message: 'Price update completed',
        updatedCount: result.updatedCount,
        errors: result.errors || []
      });
    } catch (error) {
      logger.error('Error updating prices:', error);
      next(error);
    }
  },

  async getExternalApiStatus(req, res, next) {
    try {
      const status = await externalService.checkExternalApiStatus();
      res.json(status);
    } catch (error) {
      logger.error('Error checking external API status:', error);
      next(error);
    }
  }
};

module.exports = externalController;