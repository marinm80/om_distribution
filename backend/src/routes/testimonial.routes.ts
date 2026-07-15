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
import testimonialController from '../controllers/testimonial.controller';
import { protect, restrictTo  } from '../middlewares/auth';

const router = express.Router();

router.get('/', testimonialController.getAllTestimonials);

// Rutas protegidas
router.use(protect, restrictTo('admin'));

router.post('/', testimonialController.createTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

export default router;
