import { Request, Response, NextFunction } from 'express';
import testimonialRepository from '../repositories/testimonial.repository';

class TestimonialController {
  async getAllTestimonials(req: Request, res: Response, next: NextFunction) {
    try {
      const lang = req.query.lang === 'en' ? 'en' : 'es';
      const testimonials = await testimonialRepository.findAll(lang);
      
      res.status(200).json({
        status: 'success',
        results: testimonials.length,
        data: { testimonials }
      });
    } catch (err) {
      next(err);
    }
  }

  async createTestimonial(req: Request, res: Response, next: NextFunction) {
    try {
      const newTestimonial = await testimonialRepository.create(req.body);
      res.status(201).json({
        status: 'success',
        data: { testimonial: newTestimonial }
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteTestimonial(req: Request, res: Response, next: NextFunction) {
    try {
      await testimonialRepository.delete(req.params.id as string);
      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new TestimonialController();
