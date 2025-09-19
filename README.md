# KrazyShop API
미친비교 - Crazy Comparison Shopping Platform

## Overview

KrazyShop (미친비교) is a comprehensive comparison shopping platform that provides Web Services, App Service configuration, API Management, and External API Management capabilities.

## Architecture

The application follows a modern microservices architecture with the following components:

### Web Services Layer
- **Product Management**: CRUD operations for products
- **User Authentication**: JWT-based authentication system
- **Search & Comparison**: Advanced product search and comparison features
- **Price Tracking**: Real-time price monitoring and comparison

### App Service Configuration
- Environment-based configuration management
- Security settings (JWT, rate limiting, CORS)
- API versioning and documentation
- Health monitoring endpoints

### API Management
- RESTful API design with OpenAPI/Swagger documentation
- Rate limiting and throttling
- Request/response validation
- Error handling and logging
- API versioning (v1)

### External API Management
- Circuit breaker pattern for resilience
- Retry mechanism with exponential backoff
- External API health monitoring
- Data synchronization from third-party sources

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

### API Documentation

Once running, access the interactive API documentation at:
```
http://localhost:3000/api-docs
```

### Health Check

Check application health:
```
GET http://localhost:3000/health
```

## API Endpoints

### Products
- `GET /api/v1/products` - Get all products with optional filtering
- `GET /api/v1/products/search?q={query}` - Search products
- `GET /api/v1/products/{id}` - Get product by ID
- `POST /api/v1/products` - Create new product (requires authentication)

### Users
- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - User login
- `GET /api/v1/users/profile` - Get user profile (requires authentication)

### Comparison
- `POST /api/v1/comparison/products` - Compare multiple products
- `GET /api/v1/comparison/prices/{productId}` - Compare prices across sources
- `GET /api/v1/comparison/recommendations` - Get product recommendations

### External APIs
- `POST /api/v1/external/sync/products` - Sync products from external APIs
- `POST /api/v1/external/prices/update` - Update prices from external sources
- `GET /api/v1/external/status` - Check external API health

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build
npm start
```

## Security Features

- JWT authentication with configurable expiration
- Rate limiting to prevent abuse
- CORS protection
- Helmet.js security headers
- Input validation and sanitization
- Password hashing with bcrypt

## Monitoring and Logging

- Structured logging with timestamps
- Health check endpoints
- External API monitoring
- Error tracking and reporting

## Deployment

The application is designed for cloud deployment with:
- Environment-based configuration
- Health checks for load balancers
- Horizontal scaling support
- External API resilience patterns

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests and linting
6. Submit a pull request
