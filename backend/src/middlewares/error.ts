import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';

const errorHandler = (err: AppError | Error, req: Request, res: Response, next: NextFunction) => {
  const appErr = err as AppError;
  appErr.statusCode = appErr.statusCode || 500;
  appErr.status = appErr.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(appErr.statusCode).json({
      status: appErr.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Producción: No enviar stack trace
    res.status(appErr.statusCode).json({
      status: appErr.status,
      message: err.message || 'Something went wrong!'
    });
  }
};

export default errorHandler;
