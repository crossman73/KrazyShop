const request = require('supertest');
const app = require('../../src/app');

describe('API Health Check', () => {
  test('GET /health should return 200', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('environment');
  });
});

describe('API Information', () => {
  test('GET /api/v1 should return API info', async () => {
    const response = await request(app)
      .get('/api/v1')
      .expect(200);

    expect(response.body).toHaveProperty('name', 'KrazyShop API');
    expect(response.body).toHaveProperty('version', '1.0.0');
    expect(response.body).toHaveProperty('endpoints');
  });
});

describe('404 Handler', () => {
  test('GET /nonexistent should return 404', async () => {
    const response = await request(app)
      .get('/nonexistent')
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Not Found');
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('path', '/nonexistent');
  });
});