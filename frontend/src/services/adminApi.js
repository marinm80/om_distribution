import api from './api';

// Auth
export const login = (email, password) => api.post('/auth/login', { email, password });
export const refreshToken = () => api.post('/auth/refresh');
export const logout = () => api.post('/auth/logout');

// Dashboard
export const getDashboardStats = (token) =>
  api.get('/dashboard/stats', { headers: { Authorization: `Bearer ${token}` } });

// Products (Admin)
export const getAdminProducts = (token) =>
  api.get('/products?lang=es', { headers: { Authorization: `Bearer ${token}` } });

export const createProduct = (data, token) =>
  api.post('/products', data, { headers: { Authorization: `Bearer ${token}` } });

export const updateProduct = (id, data, token) =>
  api.patch(`/products/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteProduct = (id, token) =>
  api.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const bulkImportProducts = (products, token) =>
  api.post('/products/bulk', { products }, { headers: { Authorization: `Bearer ${token}` } });

export const toggleProductField = (id, field, value, token) =>
  api.patch(`/products/${id}/toggle`, { field, value }, { headers: { Authorization: `Bearer ${token}` } });

export const uploadImage = (file, token) => {
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
export const getAdminCategories = (token) =>
  api.get('/categories', { headers: { Authorization: `Bearer ${token}` } });

export const createCategory = (data, token) =>
  api.post('/categories', data, { headers: { Authorization: `Bearer ${token}` } });

export const updateCategory = (id, data, token) =>
  api.patch(`/categories/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteCategory = (id, token) =>
  api.delete(`/categories/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Testimonials (Admin)
export const getAdminTestimonials = (token) =>
  api.get('/testimonials?lang=es', { headers: { Authorization: `Bearer ${token}` } });

export const createTestimonial = (data, token) =>
  api.post('/testimonials', data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTestimonial = (id, token) =>
  api.delete(`/testimonials/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Contacts (Admin)
export const getAdminContacts = (token) =>
  api.get('/contact', { headers: { Authorization: `Bearer ${token}` } });

// Users (Admin)
export const getAdminUsers = (token) =>
  api.get('/users', { headers: { Authorization: `Bearer ${token}` } });

export const createUser = (data, token) =>
  api.post('/users', data, { headers: { Authorization: `Bearer ${token}` } });

export const updateUser = (id, data, token) =>
  api.patch(`/users/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteUser = (id, token) =>
  api.delete(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
