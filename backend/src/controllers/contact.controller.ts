/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
import { Request, Response, NextFunction } from 'express';
import contactRepository from '../repositories/contact.repository';
import AppError from '../utils/AppError';

class ContactController {
  async submitContact(req: Request, res: Response, next: NextFunction) {
    try {
      const { full_name, email, message } = req.body;

      // Validación básica
      if (!full_name || !email || !message) {
        return next(new AppError('Please provide full name, email and message', 400));
      }

      // Guardar en BD
      const lead = await contactRepository.create(req.body);

      // Respuesta de éxito
      res.status(201).json({
        status: 'success',
        message: 'Message sent successfully. We will contact you soon.',
        data: { lead }
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllLeads(req: Request, res: Response, next: NextFunction) {
    try {
      const leads = await contactRepository.findAll();
      res.status(200).json({
        status: 'success',
        results: leads.length,
        data: { leads }
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ContactController();
