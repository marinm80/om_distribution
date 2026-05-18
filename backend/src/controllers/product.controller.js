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

  // Public endpoint: only active + show_on_landing products
  async getLandingProducts(req, res, next) {
    try {
      const lang = req.query.lang === 'en' ? 'en' : 'es';
      const products = await productRepository.findForLanding(lang);

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
        message: 'Product created successfully',
        data: { product: newProduct }
      });
    } catch (err) {
      res.status(400).json({
        status: 'error',
        message: err.message
      });
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

  async toggleField(req, res, next) {
    try {
      const { field, value } = req.body;
      if (!['is_active', 'show_on_landing'].includes(field)) {
        return next(new AppError('Invalid field. Must be is_active or show_on_landing', 400));
      }

      const product = await productRepository.toggleField(req.params.id, field, value);
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

  async bulkCreate(req, res, next) {
    try {
      const { products } = req.body;
      if (!Array.isArray(products) || products.length === 0) {
        return next(new AppError('Please provide an array of products', 400));
      }

      const results = await productRepository.bulkCreate(products);
      res.status(201).json({
        status: 'success',
        message: `${results.length} products imported successfully`,
        data: { products: results, imported: results.length }
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProductController();
