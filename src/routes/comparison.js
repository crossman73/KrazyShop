const express = require('express');
const router = express.Router();
const comparisonController = require('../controllers/comparisonController');

/**
 * @swagger
 * /api/v1/comparison/products:
 *   post:
 *     summary: Compare multiple products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productIds
 *             properties:
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of product IDs to compare
 *     responses:
 *       200:
 *         description: Comparison results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 comparison:
 *                   type: object
 *                   properties:
 *                     cheapest:
 *                       $ref: '#/components/schemas/Product'
 *                     mostExpensive:
 *                       $ref: '#/components/schemas/Product'
 *                     averagePrice:
 *                       type: number
 */
router.post('/products', comparisonController.compareProducts);

/**
 * @swagger
 * /api/v1/comparison/prices/{productId}:
 *   get:
 *     summary: Compare prices across different sources
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Price comparison results
 */
router.get('/prices/:productId', comparisonController.comparePrices);

/**
 * @swagger
 * /api/v1/comparison/recommendations:
 *   get:
 *     summary: Get product recommendations based on user preferences
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Recommended products
 */
router.get('/recommendations', comparisonController.getRecommendations);

module.exports = router;