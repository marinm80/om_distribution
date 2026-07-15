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
import contactController from '../controllers/contact.controller';
import rateLimiter from '../middlewares/rateLimiter';
import { protect, restrictTo  } from '../middlewares/auth';

const router = express.Router();

// Publico con rate limit
router.post('/', rateLimiter, contactController.submitContact);

// Solo admin puede ver los leads
router.get('/', protect, restrictTo('admin'), contactController.getAllLeads);

export default router;
