import { Request, Response, NextFunction } from 'express';
import productRepository from '../repositories/product.repository';
import AppError from '../utils/AppError';

class ProductController {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
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
  async getLandingProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const lang = typeof req.query.lang === 'string' && req.query.lang === 'en' ? 'en' : 'es';
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

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const lang = typeof req.query.lang === 'string' && req.query.lang === 'en' ? 'en' : 'es';
      const product = await productRepository.findById(req.params.id as string, lang);
      
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

  async createProduct(req: Request, res: Response, next: NextFunction) {
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
        message: (err as Error).message
      });
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productRepository.update(req.params.id as string, req.body);
      
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

  async toggleField(req: Request, res: Response, next: NextFunction) {
    try {
      const { field, value } = req.body;
      if (!['is_active', 'show_on_landing'].includes(field)) {
        return next(new AppError('Invalid field. Must be is_active or show_on_landing', 400));
      }

      const product = await productRepository.toggleField(req.params.id as string, field, value);
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

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await productRepository.delete(req.params.id as string);
      res.status(204).json({
        status: 'success',
        data: null
      });
    } catch (err) {
      next(err);
    }
  }

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const lang = typeof req.query.lang === 'string' && req.query.lang === 'en' ? 'en' : 'es';
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

  async bulkCreate(req: Request, res: Response, next: NextFunction) {
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

export default new ProductController();
