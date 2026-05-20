import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError';
import { AuthRequest } from '../types';

const protect = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // 1. Obtener token del header o query param (para descargas de archivos)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query.token) {
    token = req.query.token as string;
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2. Verificar token
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return next(new AppError('JWT secret is missing in server configuration', 500));
  }

  try {
    const decoded = jwt.verify(token, secret) as { id: number; email: string; role: string };
    (req as AuthRequest).user = decoded;
    next();
  } catch (err) {
    return next(new AppError('Invalid token. Please log in again.', 401));
  }
};

const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    if (!authReq.user || !roles.includes(authReq.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

export { protect, restrictTo };
