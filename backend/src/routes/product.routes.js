const express = require('express');
const productController = require('../controllers/product.controller');
const { protect, restrictTo } = require('../middlewares/auth');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/categories', productController.getCategories);
router.get('/:id', productController.getProduct);

// Rutas protegidas para Admin
router.use(protect, restrictTo('admin'));

router.post('/', productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
