/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { validateEnv  } from './config/env';
import errorHandler from './middlewares/error';
import pool from './config/pool';

// Rutas
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import testimonialRoutes from './routes/testimonial.routes';
import contactRoutes from './routes/contact.routes';
import dashboardRoutes from './routes/dashboard.routes';
import categoryRoutes from './routes/category.routes';
import userRoutes from './routes/user.routes';
import uploadRoutes from './routes/upload.routes';
import proxyRoutes from './routes/proxy.routes';
import path from 'path';

validateEnv();

const app = express();
app.set('trust proxy', 1); // Trust nginx proxy so req.protocol returns https correctly

// Middlewares de Seguridad y Logs
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Servir archivos estáticos (CORS abierto: las imágenes de producto son públicas)
app.use('/uploads', (req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/proxy', proxyRoutes);

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

export default app;
