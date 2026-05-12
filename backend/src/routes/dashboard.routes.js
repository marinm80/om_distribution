const express = require('express');
const { protect, restrictTo } = require('../middlewares/auth');
const pool = require('../config/pool');

const router = express.Router();

router.use(protect, restrictTo('admin'));

// Dashboard stats
router.get('/stats', async (req, res, next) => {
  try {
    const [products, categories, testimonials, contacts] = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM products'),
      pool.query('SELECT COUNT(*) as count FROM categories'),
      pool.query('SELECT COUNT(*) as count FROM testimonials'),
      pool.query('SELECT COUNT(*) as count FROM contacts'),
    ]);

    const recentContacts = await pool.query(
      'SELECT id, full_name, email, company_name, created_at FROM contacts ORDER BY created_at DESC LIMIT 5'
    );

    const contactsByMonth = await pool.query(`
      SELECT 
        TO_CHAR(created_at, 'Mon') as month,
        COUNT(*) as count 
      FROM contacts 
      WHERE created_at >= NOW() - INTERVAL '6 months'
      GROUP BY TO_CHAR(created_at, 'Mon'), DATE_TRUNC('month', created_at)
      ORDER BY DATE_TRUNC('month', created_at) ASC
    `);

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalProducts: parseInt(products.rows[0].count),
          totalCategories: parseInt(categories.rows[0].count),
          totalTestimonials: parseInt(testimonials.rows[0].count),
          totalContacts: parseInt(contacts.rows[0].count),
        },
        recentContacts: recentContacts.rows,
        contactsByMonth: contactsByMonth.rows,
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
