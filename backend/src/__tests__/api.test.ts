import request from 'supertest';
import app from '../app';
import pool from '../config/pool';

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
    it('should return products list with correct shape', async () => {
      const res = await request(app).get('/api/products');
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data.products)).toBe(true);
      expect(res.body.data.products.length).toBeGreaterThan(0);
      const p = res.body.data.products[0];
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('image_url');
      expect(p).toHaveProperty('category_id');
    });

    it('should return same product count for lang=en and lang=es', async () => {
      const [resEs, resEn] = await Promise.all([
        request(app).get('/api/products?lang=es'),
        request(app).get('/api/products?lang=en'),
      ]);
      expect(resEs.statusCode).toEqual(200);
      expect(resEn.statusCode).toEqual(200);
      expect(resEs.body.data.products.length).toBe(resEn.body.data.products.length);
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
