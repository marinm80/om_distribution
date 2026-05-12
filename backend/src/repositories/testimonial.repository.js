const pool = require('../config/pool');

class TestimonialRepository {
  async findAll(lang = 'es') {
    const query = `
      SELECT 
        id, 
        author_name, 
        content_${lang} as content, 
        rating, 
        role_${lang} as role, 
        image_url,
        created_at
      FROM testimonials
      ORDER BY created_at DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  async create(data) {
    const { author_name, content_en, content_es, rating, role_en, role_es, image_url } = data;
    const query = `
      INSERT INTO testimonials (author_name, content_en, content_es, rating, role_en, role_es, image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [author_name, content_en, content_es, rating, role_en, role_es, image_url]);
    return rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM testimonials WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = new TestimonialRepository();
