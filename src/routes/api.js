const express = require('express');
const router = express.Router();

const productsRouter = require('./products');
const usersRouter = require('./users');
const comparisonRouter = require('./comparison');
const externalRouter = require('./external');

/**
 * @swagger
 * /api/v1:
 *   get:
 *     summary: API Information
 *     description: Get information about the KrazyShop API
 *     responses:
 *       200:
 *         description: API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 version:
 *                   type: string
 *                 description:
 *                   type: string
 */
router.get('/', (req, res) => {
  res.json({
    name: 'KrazyShop API',
    version: '1.0.0',
    description: '미친비교 - Crazy Comparison Shopping Platform',
    endpoints: {
      products: '/products',
      users: '/users',
      comparison: '/comparison',
      external: '/external'
    }
  });
});

// Route modules
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/comparison', comparisonRouter);
router.use('/external', externalRouter);

module.exports = router;