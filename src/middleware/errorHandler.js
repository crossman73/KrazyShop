const logger = require('../utils/logger');

const errorHandler = (error, req, res, _next) => {
  logger.error('Unhandled error:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query
  });

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: error.message,
      ...(isDevelopment && { stack: error.stack })
    });
  }

  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or missing authentication token'
    });
  }

  if (error.status && error.status < 500) {
    return res.status(error.status).json({
      error: error.name || 'Client Error',
      message: error.message
    });
  }

  // Server errors
  res.status(500).json({
    error: 'Internal Server Error',
    message: isDevelopment ? error.message : 'Something went wrong on our end',
    ...(isDevelopment && { stack: error.stack })
  });
};

module.exports = errorHandler;