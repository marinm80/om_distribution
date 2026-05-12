const express = require('express');
const productController = require('../controllers/product.controller');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/categories', productController.getCategories);
router.get('/:id', productController.getProduct);

// Rutas protegidas para Admin y Seller (crear y modificar)
router.use(protect, restrictTo('admin', 'seller'));

router.post('/', productController.createProduct);
router.patch('/:id', productController.updateProduct);

// Solo admin puede eliminar
router.delete('/:id', restrictTo('admin'), productController.deleteProduct);

module.exports = router;
