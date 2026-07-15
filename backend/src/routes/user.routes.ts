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
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { protect, restrictTo } from '../middlewares/auth';
import pool from '../config/pool';
import AppError from '../utils/AppError';
import { AuthRequest } from '../types';

const router = express.Router();
router.use(protect, restrictTo('admin'));

// List all users
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [rows]: any = await pool.query(
      'SELECT id, email, role, created_at, updated_at FROM users ORDER BY created_at DESC'
    );
    res.status(200).json({ status: 'success', results: rows.length, data: { users: rows } });
  } catch (err) { next(err); }
});

// Create user
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return next(new AppError('Email and password are required', 400));
    if (!['admin', 'seller'].includes(role)) return next(new AppError('Role must be admin or seller', 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = crypto.randomUUID();
    await pool.query(
      'INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)',
      [id, email, hashedPassword, role]
    );
    const [rows]: any = await pool.query('SELECT id, email, role, created_at FROM users WHERE id = ?', [id]);
    res.status(201).json({ status: 'success', data: { user: rows[0] } });
  } catch (err) {
    if ((err as any).code === 'ER_DUP_ENTRY') return next(new AppError('Email already exists', 409));
    next(err);
  }
});

// Update user
router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, role } = req.body;
    if (role && !['admin', 'seller'].includes(role)) return next(new AppError('Role must be admin or seller', 400));

    let query, params;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      query = 'UPDATE users SET email = COALESCE(?, email), password = ?, role = COALESCE(?, role) WHERE id = ?';
      params = [email, hashed, role, req.params.id];
    } else {
      query = 'UPDATE users SET email = COALESCE(?, email), role = COALESCE(?, role) WHERE id = ?';
      params = [email, role, req.params.id];
    }

    await pool.query(query, params);
    const [rows]: any = await pool.query('SELECT id, email, role, created_at FROM users WHERE id = ?', [req.params.id]);
    if (!rows[0]) return next(new AppError('User not found', 404));
    res.status(200).json({ status: 'success', data: { user: rows[0] } });
  } catch (err) {
    if ((err as any).code === 'ER_DUP_ENTRY') return next(new AppError('Email already exists', 409));
    next(err);
  }
});

// Delete user
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Prevent self-deletion
    const authReq = req as AuthRequest;
    if (!authReq.user) return next(new AppError('Unauthorized', 401));
    if (req.params.id === authReq.user.id.toString()) return next(new AppError('Cannot delete yourself', 400));
    await pool.query('DELETE FROM refresh_tokens WHERE user_id = ?', [req.params.id]);
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) { next(err); }
});

export default router;
