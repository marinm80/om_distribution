import { Request } from 'express';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'seller';
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Product {
  id: number;
  item_code: string;
  brand: string;
  description: string;
  packaging: string;
  price: number;
  image_url: string | null;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}
