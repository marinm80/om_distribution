/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
export interface Category {
  id: number;
  name: string;
  name_en?: string;
  name_es?: string;
}

export interface Product {
  id: number;
  name: string;
  name_en?: string;
  name_es?: string;
  description: string;
  description_en?: string;
  description_es?: string;
  image_url: string;
  category_id: number | null;
  category_ids: number[];
  categories?: Category[];
  category_name?: string;
  is_active: boolean;
  show_on_landing: boolean;
  created_at?: string;
}

export interface User {
  id: string | number;
  email: string;
  role: string;
  created_at?: string;
}

export interface ContactLead {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  message: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, userToken: string) => void;
  logout: () => void;
  isLoading: boolean;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  results?: number;
}
