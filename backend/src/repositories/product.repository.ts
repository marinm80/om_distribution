/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
import pool from '../config/pool';

export interface ProductInput {
  name_en?: string;
  name_es?: string;
  description_en?: string;
  description_es?: string;
  image_url?: string;
  category_id?: string | number | null;
  category_ids?: Array<string | number>;
  is_active?: boolean;
  show_on_landing?: boolean;
}

const parseJsonArray = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];
  if (typeof value !== 'string' || value.length === 0) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed as T[] : [];
  } catch {
    return [];
  }
};

const normalizeCategoryIds = (productData: ProductInput): number[] => {
  const rawIds = productData.category_ids !== undefined
    ? productData.category_ids
    : productData.category_id !== undefined && productData.category_id !== null && productData.category_id !== ''
      ? [productData.category_id]
      : [];

  return Array.from(new Set(
    rawIds
      .map(value => Number(value))
      .filter(value => Number.isInteger(value) && value > 0)
  ));
};

class ProductRepository {
  private selectFields(lang: 'en' | 'es') {
    return `
      p.id,
      p.name_${lang} AS name,
      p.name_en,
      p.name_es,
      p.description_${lang} AS description,
      p.description_en,
      p.description_es,
      p.image_url,
      p.category_id,
      p.is_active,
      p.show_on_landing,
      c.name_${lang} AS category_name,
      p.created_at,
      COALESCE((
        SELECT JSON_ARRAYAGG(pc.category_id)
        FROM product_categories pc
        WHERE pc.product_id = p.id
      ), JSON_ARRAY()) AS category_ids,
      COALESCE((
        SELECT JSON_ARRAYAGG(JSON_OBJECT(
          'id', related_category.id,
          'name', related_category.name_${lang},
          'name_en', related_category.name_en,
          'name_es', related_category.name_es
        ))
        FROM product_categories related_pc
        INNER JOIN categories related_category ON related_category.id = related_pc.category_id
        WHERE related_pc.product_id = p.id
      ), JSON_ARRAY()) AS categories
    `;
  }

  private hydrateProduct(row: any) {
    if (!row) return null;
    return {
      ...row,
      category_ids: parseJsonArray<number>(row.category_ids).map(Number),
      categories: parseJsonArray<{ id: number; name: string; name_en: string; name_es: string }>(row.categories),
    };
  }

  private async syncCategories(connection: any, productId: number, categoryIds: number[]) {
    await connection.query('DELETE FROM product_categories WHERE product_id = ?', [productId]);
    for (const categoryId of categoryIds) {
      await connection.query(
        'INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)',
        [productId, categoryId]
      );
    }
  }

  async findAll(lang: string = 'es') {
    const safeLang: 'en' | 'es' = lang === 'en' ? 'en' : 'es';
    const [rows]: any = await pool.query(`
      SELECT ${this.selectFields(safeLang)}
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);
    return rows.map((row: any) => this.hydrateProduct(row));
  }

  async findForLanding(lang: string = 'es') {
    const safeLang: 'en' | 'es' = lang === 'en' ? 'en' : 'es';
    const [rows]: any = await pool.query(`
      SELECT ${this.selectFields(safeLang)}
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true AND p.show_on_landing = true
      ORDER BY p.created_at DESC
    `);
    return rows.map((row: any) => this.hydrateProduct(row));
  }

  async findById(id: string | number, lang: string = 'es') {
    const safeLang: 'en' | 'es' = lang === 'en' ? 'en' : 'es';
    const [rows]: any = await pool.query(`
      SELECT ${this.selectFields(safeLang)}
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `, [id]);
    return this.hydrateProduct(rows[0]);
  }

  async create(productData: ProductInput) {
    const categoryIds = normalizeCategoryIds(productData);
    const primaryCategoryId = categoryIds[0] ?? null;
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();
      const [result]: any = await connection.query(`
        INSERT INTO products (
          name_en, name_es, description_en, description_es, image_url,
          category_id, is_active, show_on_landing
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        productData.name_en,
        productData.name_es,
        productData.description_en || '',
        productData.description_es || '',
        productData.image_url || null,
        primaryCategoryId,
        productData.is_active ?? true,
        productData.show_on_landing ?? false,
      ]);
      await this.syncCategories(connection, result.insertId, categoryIds);
      await connection.commit();
      return this.findById(result.insertId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async update(id: string | number, productData: ProductInput) {
    const existing = await this.findById(id);
    if (!existing) return null;

    const categoriesWereProvided = productData.category_ids !== undefined || productData.category_id !== undefined;
    const categoryIds = categoriesWereProvided ? normalizeCategoryIds(productData) : existing.category_ids;
    const primaryCategoryId = categoryIds[0] ?? null;
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();
      await connection.query(`
        UPDATE products
        SET name_en = ?, name_es = ?, description_en = ?, description_es = ?,
            image_url = ?, category_id = ?, is_active = ?, show_on_landing = ?
        WHERE id = ?
      `, [
        productData.name_en ?? existing.name_en,
        productData.name_es ?? existing.name_es,
        productData.description_en ?? existing.description_en,
        productData.description_es ?? existing.description_es,
        productData.image_url ?? existing.image_url,
        primaryCategoryId,
        productData.is_active ?? Boolean(existing.is_active),
        productData.show_on_landing ?? Boolean(existing.show_on_landing),
        id,
      ]);
      await this.syncCategories(connection, Number(id), categoryIds);
      await connection.commit();
      return this.findById(id);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async toggleField(id: string | number, field: string, value: boolean) {
    if (field !== 'is_active' && field !== 'show_on_landing') {
      throw new Error('Invalid field');
    }
    await pool.query(`UPDATE products SET ${field} = ? WHERE id = ?`, [value, id]);
    return this.findById(id);
  }

  async delete(id: string | number): Promise<void> {
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
  }

  async findAllCategories(lang: string = 'es') {
    const safeLang = lang === 'en' ? 'en' : 'es';
    const [rows]: any = await pool.query(
      `SELECT id, name_${safeLang} AS name FROM categories ORDER BY name_${safeLang} ASC`
    );
    return rows;
  }

  async bulkCreate(products: ProductInput[]) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const productIds: number[] = [];

      for (const product of products) {
        const categoryIds = normalizeCategoryIds(product);
        const primaryCategoryId = categoryIds[0] ?? null;
        const [result]: any = await connection.query(`
          INSERT INTO products (
            name_en, name_es, description_en, description_es, image_url,
            category_id, is_active, show_on_landing
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          product.name_en || '',
          product.name_es || '',
          product.description_en || '',
          product.description_es || '',
          product.image_url || null,
          primaryCategoryId,
          product.is_active ?? true,
          product.show_on_landing ?? false,
        ]);
        await this.syncCategories(connection, result.insertId, categoryIds);
        productIds.push(result.insertId);
      }

      await connection.commit();
      return Promise.all(productIds.map(productId => this.findById(productId)));
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export { normalizeCategoryIds };
export default new ProductRepository();
