/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
import pool from '../config/pool';

class TestimonialRepository {
  async findAll(lang: string = 'es') {
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
    const [rows]: any = await pool.query(query);
    return rows;
  }

  async create(data: { author_name: string; content_en: string; content_es: string; rating: number; role_en?: string; role_es?: string; image_url?: string }) {
    const { author_name, content_en, content_es, rating, role_en, role_es, image_url } = data;
    const query = `
      INSERT INTO testimonials (author_name, content_en, content_es, rating, role_en, role_es, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result]: any = await pool.query(query, [author_name, content_en, content_es, rating, role_en, role_es, image_url]);
    const [rows]: any = await pool.query('SELECT * FROM testimonials WHERE id = ?', [result.insertId]);
    return rows[0];
  }

  async delete(id: string | number) {
    const query = 'DELETE FROM testimonials WHERE id = ?';
    await pool.query(query, [id]);
  }
}

export default new TestimonialRepository();
