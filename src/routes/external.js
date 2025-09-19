const express = require('express');
const router = express.Router();
const externalController = require('../controllers/externalController');

/**
 * @swagger
 * /api/v1/external/sync/products:
 *   post:
 *     summary: Sync products from external APIs
 *     description: Fetch and sync product data from external e-commerce APIs
 *     responses:
 *       200:
 *         description: Products synced successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 syncedCount:
 *                   type: number
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.post('/sync/products', externalController.syncProducts);

/**
 * @swagger
 * /api/v1/external/prices/update:
 *   post:
 *     summary: Update prices from external sources
 *     description: Fetch updated price information from external APIs
 *     responses:
 *       200:
 *         description: Prices updated successfully
 */
router.post('/prices/update', externalController.updatePrices);

/**
 * @swagger
 * /api/v1/external/status:
 *   get:
 *     summary: Check external API status
 *     description: Check the health and availability of external APIs
 *     responses:
 *       200:
 *         description: External API status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productApi:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                     responseTime:
 *                       type: number
 *                 priceApi:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                     responseTime:
 *                       type: number
 */
router.get('/status', externalController.getExternalApiStatus);

module.exports = router;