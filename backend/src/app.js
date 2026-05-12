const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { validateEnv } = require('./config/env');
const errorHandler = require('./middlewares/error');
const pool = require('./config/pool');

// Rutas
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const contactRoutes = require('./routes/contact.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const categoryRoutes = require('./routes/category.routes');

validateEnv();

const app = express();

// Middlewares de Seguridad y Logs
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categories', categoryRoutes);

// Health Check
app.get('/api/health', async (req, res, next) => {
  try {
    await pool.query('SELECT 1');
    res.json({ 
      success: true, 
      data: { db: 'connected' }, 
      message: 'OM Distribution API is running', 
      error: null 
    });
  } catch (err) {
    next(err);
  }
});

// Manejo de errores global
app.use(errorHandler);

module.exports = app;
