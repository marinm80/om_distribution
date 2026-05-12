const express = require('express');
const bcrypt = require('bcryptjs');
const { protect, restrictTo } = require('../middlewares/auth');
const pool = require('../config/pool');
const AppError = require('../utils/AppError');

const router = express.Router();
router.use(protect, restrictTo('admin'));

// List all users
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, email, role, created_at, updated_at FROM users ORDER BY created_at DESC'
    );
    res.status(200).json({ status: 'success', results: rows.length, data: { users: rows } });
  } catch (err) { next(err); }
});

// Create user
router.post('/', async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return next(new AppError('Email and password are required', 400));
    if (!['admin', 'seller'].includes(role)) return next(new AppError('Role must be admin or seller', 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at',
      [email, hashedPassword, role]
    );
    res.status(201).json({ status: 'success', data: { user: rows[0] } });
  } catch (err) {
    if (err.code === '23505') return next(new AppError('Email already exists', 409));
    next(err);
  }
});

// Update user
router.patch('/:id', async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (role && !['admin', 'seller'].includes(role)) return next(new AppError('Role must be admin or seller', 400));

    let query, params;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      query = 'UPDATE users SET email = COALESCE($1, email), password = $2, role = COALESCE($3, role) WHERE id = $4 RETURNING id, email, role, created_at';
      params = [email, hashed, role, req.params.id];
    } else {
      query = 'UPDATE users SET email = COALESCE($1, email), role = COALESCE($2, role) WHERE id = $3 RETURNING id, email, role, created_at';
      params = [email, role, req.params.id];
    }

    const { rows } = await pool.query(query, params);
    if (!rows[0]) return next(new AppError('User not found', 404));
    res.status(200).json({ status: 'success', data: { user: rows[0] } });
  } catch (err) {
    if (err.code === '23505') return next(new AppError('Email already exists', 409));
    next(err);
  }
});

// Delete user
router.delete('/:id', async (req, res, next) => {
  try {
    // Prevent self-deletion
    if (req.params.id === req.user.id) return next(new AppError('Cannot delete yourself', 400));
    await pool.query('DELETE FROM refresh_tokens WHERE user_id = $1', [req.params.id]);
    await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) { next(err); }
});

module.exports = router;
