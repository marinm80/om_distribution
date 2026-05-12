const request = require('supertest');
const app = require('../app');
const pool = require('../config/pool');

describe('OM Distribution API Integration Tests', () => {
  afterAll(async () => {
    await pool.end();
  });

  describe('GET /api/health', () => {
    it('should return 200 and success status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('Products API', () => {
    it('should return products in Spanish by default', async () => {
      const res = await request(app).get('/api/products');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.products.length).toBeGreaterThan(0);
      // El seed tiene 'Arroz Premium' en español
      expect(res.body.data.products.some(p => p.name === 'Arroz Premium')).toBe(true);
    });

    it('should return products in English when lang=en', async () => {
      const res = await request(app).get('/api/products?lang=en');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.products.some(p => p.name === 'Premium Rice')).toBe(true);
    });
  });

  describe('Contact API', () => {
    it('should save a new lead', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({
          full_name: 'Test User',
          email: 'test@example.com',
          message: 'This is a test message'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.status).toBe('success');
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ full_name: 'Test User' });
      expect(res.statusCode).toEqual(400);
    });
  });
});
