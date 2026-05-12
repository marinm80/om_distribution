import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

export const getProducts = (lang = 'es') => api.get(`/products?lang=${lang}`);
export const getCategories = (lang = 'es') => api.get(`/products/categories?lang=${lang}`);
export const getTestimonials = (lang = 'es') => api.get(`/testimonials?lang=${lang}`);
export const submitContact = (data) => api.post('/contact', data);

export default api;
