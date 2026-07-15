/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { protect, restrictTo  } from '../middlewares/auth';
import pool from '../config/pool';
import AppError from '../utils/AppError';

const router = express.Router();

// Public: get categories
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lang = req.query.lang === 'en' ? 'en' : 'es';
    const [rows]: any = await pool.query(`SELECT id, name_en, name_es, name_${lang} as name FROM categories ORDER BY name_${lang} ASC`);
    res.status(200).json({ status: 'success', results: rows.length, data: { categories: rows } });
  } catch (err) {
    next(err);
  }
});

// Admin and Seller can create/update
router.use(protect, restrictTo('admin', 'seller'));

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name_en, name_es } = req.body;
    if (!name_en || !name_es) return next(new AppError('name_en and name_es are required', 400));
    const [result]: any = await pool.query(
      'INSERT INTO categories (name_en, name_es) VALUES (?, ?)',
      [name_en, name_es]
    );
    const [rows]: any = await pool.query('SELECT * FROM categories WHERE id = ?', [result.insertId]);
    res.status(201).json({ status: 'success', data: { category: rows[0] } });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name_en, name_es } = req.body;
    await pool.query(
      'UPDATE categories SET name_en = ?, name_es = ? WHERE id = ?',
      [name_en, name_es, req.params.id]
    );
    const [rows]: any = await pool.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    if (!rows[0]) return next(new AppError('Category not found', 404));
    res.status(200).json({ status: 'success', data: { category: rows[0] } });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', restrictTo('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await pool.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    next(err);
  }
});

export default router;
