const express = require('express');
const testimonialController = require('../controllers/testimonial.controller');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

router.get('/', testimonialController.getAllTestimonials);

// Rutas protegidas
router.use(protect, restrictTo('admin'));

router.post('/', testimonialController.createTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;
