const express = require('express');
const { protect, restrictTo } = require('../middlewares/auth');
const pool = require('../config/pool');
const AppError = require('../utils/AppError');

const router = express.Router();

// Public: get categories
router.get('/', async (req, res, next) => {
  try {
    const lang = req.query.lang === 'en' ? 'en' : 'es';
    const { rows } = await pool.query(`SELECT id, name_en, name_es, name_${lang} as name FROM categories ORDER BY name_${lang} ASC`);
    res.status(200).json({ status: 'success', results: rows.length, data: { categories: rows } });
  } catch (err) {
    next(err);
  }
});

// Admin and Seller can create/update
router.use(protect, restrictTo('admin', 'seller'));

router.post('/', async (req, res, next) => {
  try {
    const { name_en, name_es } = req.body;
    if (!name_en || !name_es) return next(new AppError('name_en and name_es are required', 400));
    const { rows } = await pool.query(
      'INSERT INTO categories (name_en, name_es) VALUES ($1, $2) RETURNING *',
      [name_en, name_es]
    );
    res.status(201).json({ status: 'success', data: { category: rows[0] } });
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { name_en, name_es } = req.body;
    const { rows } = await pool.query(
      'UPDATE categories SET name_en = $1, name_es = $2 WHERE id = $3 RETURNING *',
      [name_en, name_es, req.params.id]
    );
    if (!rows[0]) return next(new AppError('Category not found', 404));
    res.status(200).json({ status: 'success', data: { category: rows[0] } });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', restrictTo('admin'), async (req, res, next) => {
  try {
    await pool.query('DELETE FROM categories WHERE id = $1', [req.params.id]);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
