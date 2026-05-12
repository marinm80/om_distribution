const pool = require('../config/pool');

class ProductRepository {
  async findAll(lang = 'es') {
    const query = `
      SELECT 
        p.id, 
        p.name_${lang} as name, 
        p.description_${lang} as description, 
        p.image_url, 
        p.category_id,
        c.name_${lang} as category_name,
        p.created_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  async findById(id, lang = 'es') {
    const query = `
      SELECT 
        p.id, 
        p.name_${lang} as name, 
        p.description_${lang} as description, 
        p.image_url, 
        p.category_id,
        c.name_${lang} as category_name,
        p.created_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = $1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async create(productData) {
    const { name_en, name_es, description_en, description_es, image_url, category_id } = productData;
    const query = `
      INSERT INTO products (name_en, name_es, description_en, description_es, image_url, category_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [name_en, name_es, description_en, description_es, image_url, category_id]);
    return rows[0];
  }

  async update(id, productData) {
    const { name_en, name_es, description_en, description_es, image_url, category_id } = productData;
    const query = `
      UPDATE products 
      SET name_en = $1, name_es = $2, description_en = $3, description_es = $4, image_url = $5, category_id = $6
      WHERE id = $7
      RETURNING *
    `;
    const { rows } = await pool.query(query, [name_en, name_es, description_en, description_es, image_url, category_id, id]);
    return rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM products WHERE id = $1';
    await pool.query(query, [id]);
  }

  // Categorías
  async findAllCategories(lang = 'es') {
    const query = `SELECT id, name_${lang} as name FROM categories ORDER BY name_${lang} ASC`;
    const { rows } = await pool.query(query);
    return rows;
  }
}

module.exports = new ProductRepository();
