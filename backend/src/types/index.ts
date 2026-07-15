/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
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
  id: string | number;
  name: string;
  name_en: string;
  name_es: string;
  description: string;
  description_en: string;
  description_es: string;
  image_url: string | null;
  category_id: number | null;
  category_ids: number[];
  categories: Array<{ id: number; name: string; name_en: string; name_es: string }>;
  is_active: boolean;
  show_on_landing: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string | number;
    email: string;
    role: string;
  };
}
