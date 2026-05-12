const contactRepository = require('../repositories/contact.repository');
const AppError = require('../utils/AppError');

class ContactController {
  async submitContact(req, res, next) {
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

  async getAllLeads(req, res, next) {
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

module.exports = new ContactController();
