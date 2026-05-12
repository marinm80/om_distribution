const rateLimit = require('express-rate-limit');

// Limitar a 5 peticiones por minuto para endpoints críticos (Auth/Contacto)
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 5,
  message: {
    status: 'fail',
    message: 'Too many requests, please try again in a minute.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = apiLimiter;
