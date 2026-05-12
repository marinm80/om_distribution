const testimonialRepository = require('../repositories/testimonial.repository');

class TestimonialController {
  async getAllTestimonials(req, res, next) {
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

  async createTestimonial(req, res, next) {
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

  async deleteTestimonial(req, res, next) {
    try {
      await testimonialRepository.delete(req.params.id);
      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TestimonialController();
