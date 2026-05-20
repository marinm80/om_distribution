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
