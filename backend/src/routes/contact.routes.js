const express = require('express');
const contactController = require('../controllers/contact.controller');
const rateLimiter = require('../middlewares/rateLimiter');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

// Publico con rate limit
router.post('/', rateLimiter, contactController.submitContact);

// Solo admin puede ver los leads
router.get('/', protect, restrictTo('admin'), contactController.getAllLeads);

module.exports = router;
