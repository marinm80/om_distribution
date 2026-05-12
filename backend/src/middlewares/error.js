const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Producción: No enviar stack trace
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message || 'Something went wrong!'
    });
  }
};

module.exports = errorHandler;
