module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 3000,
  apiVersion: process.env.API_VERSION || 'v1',
  
  // Security
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key',
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
  
  // Rate limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  
  // External APIs
  externalApis: {
    productApi: {
      url: process.env.EXTERNAL_PRODUCT_API_URL || 'https://api.example.com/products',
      key: process.env.EXTERNAL_PRODUCT_API_KEY || ''
    },
    priceApi: {
      url: process.env.EXTERNAL_PRICE_API_URL || 'https://api.pricecomparison.com',
      key: process.env.EXTERNAL_PRICE_API_KEY || ''
    }
  },
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info'
};