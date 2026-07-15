/**
 * ====================================================================
 * PROYECTO: OM Distribution: Plataforma Web para Distribuidora de Alimentos (React + Node/Express + MySQL)
 * AUTOR: Rafael Marín
 * PORTFOLIO: https://github.com/marinm80
 * DESCRIPCIÓN: Desarrollado como proyecto práctico de nivel profesional.
 * ====================================================================
 */
import api from './api';
import { Product, Testimonial, User, Category } from '../types';

// Auth
export const login = (email: string, password: string) => api.post('/auth/login', { email, password });
export const refreshToken = () => api.post('/auth/refresh');
export const logout = () => api.post('/auth/logout');

// Dashboard
export const getDashboardStats = (token: string) =>
  api.get('/dashboard/stats', { headers: { Authorization: `Bearer ${token}` } });

// Products (Admin)
export const getAdminProducts = (token: string) =>
  api.get('/products?lang=es', { headers: { Authorization: `Bearer ${token}` } });

export const createProduct = (data: Partial<Product>, token: string) =>
  api.post('/products', data, { headers: { Authorization: `Bearer ${token}` } });

export const updateProduct = (id: string | number, data: Partial<Product>, token: string) =>
  api.patch(`/products/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteProduct = (id: string | number, token: string) =>
  api.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const bulkImportProducts = (products: Partial<Product>[], token: string) =>
  api.post('/products/bulk', { products }, { headers: { Authorization: `Bearer ${token}` } });

export const toggleProductField = (id: string | number, field: string, value: boolean, token: string) =>
  api.patch(`/products/${id}/toggle`, { field, value }, { headers: { Authorization: `Bearer ${token}` } });

export const uploadImage = (file: File, token: string) => {
  const formData = new FormData();
  formData.append('image', file);
  return api.post('/upload/image', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Categories (Admin)
export const getAdminCategories = (token: string) =>
  api.get('/categories', { headers: { Authorization: `Bearer ${token}` } });

export const createCategory = (data: Partial<Category>, token: string) =>
  api.post('/categories', data, { headers: { Authorization: `Bearer ${token}` } });

export const updateCategory = (id: string | number, data: Partial<Category>, token: string) =>
  api.patch(`/categories/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteCategory = (id: string | number, token: string) =>
  api.delete(`/categories/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Testimonials (Admin)
export const getAdminTestimonials = (token: string) =>
  api.get('/testimonials?lang=es', { headers: { Authorization: `Bearer ${token}` } });

export const createTestimonial = (data: Partial<Testimonial>, token: string) =>
  api.post('/testimonials', data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTestimonial = (id: string | number, token: string) =>
  api.delete(`/testimonials/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Contacts (Admin)
export const getAdminContacts = (token: string) =>
  api.get('/contact', { headers: { Authorization: `Bearer ${token}` } });

// Users (Admin)
export const getAdminUsers = (token: string) =>
  api.get('/users', { headers: { Authorization: `Bearer ${token}` } });

export const createUser = (data: Partial<User> & { password?: string }, token: string) =>
  api.post('/users', data, { headers: { Authorization: `Bearer ${token}` } });

export const updateUser = (id: string | number, data: Partial<User> & { password?: string }, token: string) =>
  api.patch(`/users/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteUser = (id: string | number, token: string) =>
  api.delete(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
