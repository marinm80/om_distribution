import request from 'supertest';
import app from '../app';
import pool from '../config/pool';
import productRepository from '../repositories/product.repository';

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

  describe('Removed testimonial API', () => {
    it('should not expose the retired testimonial endpoint', async () => {
      const res = await request(app).get('/api/testimonials');
      expect(res.statusCode).toEqual(404);
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
      expect(p).toHaveProperty('category_ids');
      expect(Array.isArray(p.category_ids)).toBe(true);
      expect(p).toHaveProperty('categories');
      expect(Array.isArray(p.categories)).toBe(true);
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

    it('persists multiple category relations transactionally', async () => {
      const [categoryRows]: any = await pool.query('SELECT id FROM categories ORDER BY id LIMIT 2');
      expect(categoryRows).toHaveLength(2);

      const created = await productRepository.create({
        name_en: 'Integration Product',
        name_es: 'Producto de IntegraciÃ³n',
        description_en: 'Temporary integration test product',
        description_es: 'Producto temporal para prueba de integraciÃ³n',
        category_ids: categoryRows.map((category: { id: number }) => category.id),
        is_active: false,
        show_on_landing: false,
      });

      try {
        expect([...created.category_ids].sort()).toEqual(categoryRows.map((category: { id: number }) => category.id).sort());

        const updated = await productRepository.update(created.id, {
          category_ids: [categoryRows[1].id],
        });
        expect(updated?.category_ids).toEqual([categoryRows[1].id]);
        expect(updated?.category_id).toBe(categoryRows[1].id);
      } finally {
        await productRepository.delete(created.id);
      }
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

  describe('Auth rate limiting', () => {
    it('should return 429 after repeated failed login attempts', async () => {
      const responses = [];
      for (let attempt = 0; attempt < 6; attempt += 1) {
        responses.push(await request(app)
          .post('/api/auth/login')
          .send({ email: 'rate-limit-test@example.com', password: 'invalid-password' }));
      }
      expect(responses.slice(0, 5).every(response => response.statusCode === 401)).toBe(true);
      expect(responses[5].statusCode).toBe(429);
    });
  });
});
