import { Request, Response, NextFunction } from 'express';
import express from 'express';
import productController from '../controllers/product.controller';
import { protect, restrictTo  } from '../middlewares/auth';

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/landing', productController.getLandingProducts);
router.get('/categories', productController.getCategories);
router.get('/:id', productController.getProduct);

// Rutas protegidas para Admin y Seller (crear y modificar)
router.use(protect, restrictTo('admin', 'seller'));

router.post('/bulk', productController.bulkCreate);
router.post('/', productController.createProduct);
router.patch('/:id/toggle', productController.toggleField);
router.patch('/:id', productController.updateProduct);

// Solo admin puede eliminar
router.delete('/:id', restrictTo('admin'), productController.deleteProduct);

export default router;
