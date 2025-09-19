const { validationResult } = require('express-validator');
const productService = require('../services/productService');
const logger = require('../utils/logger');

const productController = {
  async getAllProducts(req, res, next) {
    try {
      const { category, minPrice, maxPrice } = req.query;
      const filters = {
        ...(category && { category }),
        ...(minPrice && { minPrice: parseFloat(minPrice) }),
        ...(maxPrice && { maxPrice: parseFloat(maxPrice) })
      };

      const products = await productService.getAllProducts(filters);
      res.json(products);
    } catch (error) {
      logger.error('Error getting products:', error);
      next(error);
    }
  },

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      
      if (!product) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Product not found'
        });
      }

      res.json(product);
    } catch (error) {
      logger.error('Error getting product by ID:', error);
      next(error);
    }
  },

  async searchProducts(req, res, next) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Search query is required'
        });
      }

      const products = await productService.searchProducts(q);
      res.json({
        query: q,
        results: products,
        count: products.length
      });
    } catch (error) {
      logger.error('Error searching products:', error);
      next(error);
    }
  },

  async createProduct(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation Error',
          details: errors.array()
        });
      }

      const productData = req.body;
      const product = await productService.createProduct(productData);
      
      res.status(201).json({
        message: 'Product created successfully',
        product
      });
    } catch (error) {
      logger.error('Error creating product:', error);
      next(error);
    }
  }
};

module.exports = productController;