const productRepository = require('../repositories/product.repository');
const AppError = require('../utils/AppError');

class ProductController {
  async getAllProducts(req, res, next) {
    try {
      const lang = req.query.lang === 'en' ? 'en' : 'es';
      const products = await productRepository.findAll(lang);
      
      res.status(200).json({
        status: 'success',
        results: products.length,
        data: { products }
      });
    } catch (err) {
      next(err);
    }
  }

  async getProduct(req, res, next) {
    try {
      const lang = req.query.lang === 'en' ? 'en' : 'es';
      const product = await productRepository.findById(req.params.id, lang);
      
      if (!product) {
        return next(new AppError('No product found with that ID', 404));
      }

      res.status(200).json({
        status: 'success',
        data: { product }
      });
    } catch (err) {
      next(err);
    }
  }

  async createProduct(req, res, next) {
    try {
      const newProduct = await productRepository.create(req.body);
      res.status(201).json({
        status: 'success',
        data: { product: newProduct }
      });
    } catch (err) {
      next(err);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const product = await productRepository.update(req.params.id, req.body);
      
      if (!product) {
        return next(new AppError('No product found with that ID', 404));
      }

      res.status(200).json({
        status: 'success',
        data: { product }
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      await productRepository.delete(req.params.id);
      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      next(err);
    }
  }

  async getCategories(req, res, next) {
    try {
      const lang = req.query.lang === 'en' ? 'en' : 'es';
      const categories = await productRepository.findAllCategories(lang);
      
      res.status(200).json({
        status: 'success',
        results: categories.length,
        data: { categories }
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProductController();
