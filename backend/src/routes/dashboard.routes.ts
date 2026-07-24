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

const router = express.Router();

router.use(protect, restrictTo('admin', 'seller'));

// Dashboard stats
router.get('/stats', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [[products], [categories], [contacts]] = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM products'),
      pool.query('SELECT COUNT(*) as count FROM categories'),
      pool.query('SELECT COUNT(*) as count FROM contacts'),
    ]) as any;

    const [recentContacts]: any = await pool.query(
      'SELECT id, full_name, email, company_name, created_at FROM contacts ORDER BY created_at DESC LIMIT 5'
    );

    const [contactsByMonth]: any = await pool.query(`
      SELECT 
        DATE_FORMAT(created_at, '%b') as month,
        COUNT(*) as count 
      FROM contacts 
      WHERE created_at >= NOW() - INTERVAL 6 MONTH
      GROUP BY DATE_FORMAT(created_at, '%b'), DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY DATE_FORMAT(created_at, '%Y-%m') ASC
    `);

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalProducts: parseInt(products[0].count),
          totalCategories: parseInt(categories[0].count),
          totalContacts: parseInt(contacts[0].count),
        },
        recentContacts: recentContacts,
        contactsByMonth: contactsByMonth,
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
