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
