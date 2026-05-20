import pool from '../config/pool';

export interface ProductInput {
  name_en?: string;
  name_es?: string;
  description_en?: string;
  description_es?: string;
  image_url?: string;
  category_id?: string | number | null;
  is_active?: boolean;
  show_on_landing?: boolean;
}

class ProductRepository {
  async findAll(lang: string = 'es') {
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
    const [rows]: any = await pool.query(query);
    return rows;
  }

  async findForLanding(lang: string = 'es') {
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
    const [rows]: any = await pool.query(query);
    return rows;
  }

  async findById(id: string | number, lang: string = 'es') {
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
      WHERE p.id = ?
    `;
    const [rows]: any = await pool.query(query, [id]);
    return rows[0] || null;
  }

  async create(productData: ProductInput) {
    const { name_en, name_es, description_en, description_es, image_url, category_id, is_active = true, show_on_landing = false } = productData;
    
    let finalCategoryId: number | null = null;
    if (category_id && category_id !== '') {
      finalCategoryId = typeof category_id === 'string' ? parseInt(category_id, 10) : category_id;
      if (isNaN(finalCategoryId)) finalCategoryId = null;
    }

    const query = `
      INSERT INTO products (name_en, name_es, description_en, description_es, image_url, category_id, is_active, show_on_landing)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result]: any = await pool.query(query, [name_en, name_es, description_en, description_es, image_url || null, finalCategoryId, is_active, show_on_landing]);
    const [rows]: any = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
    return rows[0];
  }

  async update(id: string | number, productData: ProductInput) {
    const { name_en, name_es, description_en, description_es, image_url, category_id, is_active, show_on_landing } = productData;
    
    let finalCategoryId: number | null = null;
    if (category_id && category_id !== '') {
      finalCategoryId = typeof category_id === 'string' ? parseInt(category_id, 10) : category_id;
      if (isNaN(finalCategoryId)) finalCategoryId = null;
    }
    const query = `
      UPDATE products 
      SET name_en = ?, name_es = ?, description_en = ?, description_es = ?, 
          image_url = ?, category_id = ?, is_active = ?, show_on_landing = ?
      WHERE id = ?
    `;
    await pool.query(query, [name_en, name_es, description_en, description_es, image_url, finalCategoryId, is_active, show_on_landing, id]);
    const [rows]: any = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  async toggleField(id: string | number, field: string, value: boolean) {
    if (field !== 'is_active' && field !== 'show_on_landing') {
      throw new Error('Invalid field');
    }
    const query = `UPDATE products SET ${field} = ? WHERE id = ?`;
    await pool.query(query, [value, id]);
    const [rows]: any = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  async delete(id: string | number): Promise<void> {
    const query = 'DELETE FROM products WHERE id = ?';
    await pool.query(query, [id]);
  }

  async findAllCategories(lang: string = 'es') {
    const query = `SELECT id, name_${lang} as name FROM categories ORDER BY name_${lang} ASC`;
    const [rows]: any = await pool.query(query);
    return rows;
  }

  async bulkCreate(products: ProductInput[]) {
    const client = await pool.getConnection();
    try {
      await client.query('START TRANSACTION');
      const results = [];

      for (const p of products) {
        const { name_en, name_es, description_en, description_es, image_url, category_id, is_active = true, show_on_landing = false } = p;
        const [result]: any = await client.query(
          `INSERT INTO products (name_en, name_es, description_en, description_es, image_url, category_id, is_active, show_on_landing)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [name_en || '', name_es || '', description_en || '', description_es || '', image_url || '', category_id || null, is_active, show_on_landing]
        );
        const [rows]: any = await client.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
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

export default new ProductRepository();
