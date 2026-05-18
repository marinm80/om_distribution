const pool = require('../config/pool');

class ProductRepository {
  async findAll(lang = 'es') {
    const query = `
      SELECT 
        p.id, 
        p.name_${lang} as name, 
        p.name_en,
        p.name_es,
        p.description_${lang} as description, 
        p.description_en,
        p.description_es,
        p.image_url, 
        p.category_id,
        p.is_active,
        p.show_on_landing,
        c.name_${lang} as category_name,
        p.created_at
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  // Public: only active products shown on landing
  async findForLanding(lang = 'es') {
    const query = `
      SELECT 
        p.id, 
        p.name_${lang} as name, 
        p.description_${lang} as description, 
        p.image_url, 
        p.category_id,
        c.name_${lang} as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true AND p.show_on_landing = true
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
        p.name_en,
        p.name_es,
        p.description_${lang} as description, 
        p.description_en,
        p.description_es,
        p.image_url, 
        p.category_id,
        p.is_active,
        p.show_on_landing,
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
    const { name_en, name_es, description_en, description_es, image_url, category_id, is_active = true, show_on_landing = false } = productData;
    
    // Normalize category_id to integer or null
    let finalCategoryId = null;
    if (category_id && category_id !== '') {
      finalCategoryId = parseInt(category_id, 10);
      if (isNaN(finalCategoryId)) finalCategoryId = null;
    }

    const query = `
      INSERT INTO products (name_en, name_es, description_en, description_es, image_url, category_id, is_active, show_on_landing)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [name_en, name_es, description_en, description_es, image_url || null, finalCategoryId, is_active, show_on_landing]);
    return rows[0];
  }

  async update(id, productData) {
    const { name_en, name_es, description_en, description_es, image_url, category_id, is_active, show_on_landing } = productData;
    
    let finalCategoryId = null;
    if (category_id && category_id !== '') {
      finalCategoryId = parseInt(category_id, 10);
      if (isNaN(finalCategoryId)) finalCategoryId = null;
    }
    const query = `
      UPDATE products 
      SET name_en = $1, name_es = $2, description_en = $3, description_es = $4, 
          image_url = $5, category_id = $6, is_active = $7, show_on_landing = $8
      WHERE id = $9
      RETURNING *
    `;
    const { rows } = await pool.query(query, [name_en, name_es, description_en, description_es, image_url, finalCategoryId, is_active, show_on_landing, id]);
    return rows[0];
  }

  async toggleField(id, field, value) {
    if (!['is_active', 'show_on_landing'].includes(field)) {
      throw new Error('Invalid field');
    }
    const query = `UPDATE products SET ${field} = $1 WHERE id = $2 RETURNING *`;
    const { rows } = await pool.query(query, [value, id]);
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

  async bulkCreate(products) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const results = [];

      for (const p of products) {
        const { name_en, name_es, description_en, description_es, image_url, category_id, is_active = true, show_on_landing = false } = p;
        const { rows } = await client.query(
          `INSERT INTO products (name_en, name_es, description_en, description_es, image_url, category_id, is_active, show_on_landing)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
          [name_en || '', name_es || '', description_en || '', description_es || '', image_url || '', category_id || null, is_active, show_on_landing]
        );
        results.push(rows[0]);
      }

      await client.query('COMMIT');
      return results;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = new ProductRepository();
