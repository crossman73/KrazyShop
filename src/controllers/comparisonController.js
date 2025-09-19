const comparisonService = require('../services/comparisonService');
const logger = require('../utils/logger');

const comparisonController = {
  async compareProducts(req, res, next) {
    try {
      const { productIds } = req.body;

      if (!productIds || !Array.isArray(productIds) || productIds.length < 2) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'At least 2 product IDs are required for comparison'
        });
      }

      const comparison = await comparisonService.compareProducts(productIds);
      res.json(comparison);
    } catch (error) {
      logger.error('Error comparing products:', error);
      next(error);
    }
  },

  async comparePrices(req, res, next) {
    try {
      const { productId } = req.params;
      const priceComparison = await comparisonService.comparePrices(productId);
      
      res.json(priceComparison);
    } catch (error) {
      logger.error('Error comparing prices:', error);
      next(error);
    }
  },

  async getRecommendations(req, res, next) {
    try {
      const { category, maxPrice } = req.query;
      const userId = req.user?.id; // Optional user context for personalized recommendations
      
      const recommendations = await comparisonService.getRecommendations({
        category,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        userId
      });
      
      res.json({
        recommendations,
        count: recommendations.length,
        filters: {
          category,
          maxPrice
        }
      });
    } catch (error) {
      logger.error('Error getting recommendations:', error);
      next(error);
    }
  }
};

module.exports = comparisonController;