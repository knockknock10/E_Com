import axios from 'axios';

const API_BASE_URL = 'https://ecommerce-backend-1-8fi4.onrender.com/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Category API calls
export const categoryAPI = {
  getAll: async () => {
    const response = await api.get('/api/categories/');

    return response.data.map((category) => ({
      ...category,
      images: Array.isArray(category.images_url)
        ? category.images_url.map((img) => img.image)
        : [],
    }));
  },

  getById: async (id) => {
    const response = await api.get(`/api/categories/${id}/`);
    const category = response.data;

    return {
      ...category,
      images: Array.isArray(category.images_url)
        ? category.images_url.map((img) => img.image)
        : [],
    };
  },

  create: async (data) => {
    const response = await api.post('/api/categories/', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/api/categories/${id}/`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/categories/${id}/`);
    return response.data;
  },
};

// product API calls
export const productAPI = {
  getAll: async () => {
    const response = await api.get('/api/products/');

    return response.data.map((product) => ({
      ...product,
      images: Array.isArray(product.images_url)
        ? product.images_url.map((img) => img.image)
        : [],
    }));
  },

  getById: async (id) => {
    const response = await api.get(`/api/products/${id}/`);

    const product = response.data;
    return {
      ...product,
      images: Array.isArray(product.images_url)
        ? product.images_url.map((img) => img.image)
        : [],
    };
  },

  create: async (data) => {
    const response = await api.post('/api/products/', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/api/products/${id}/`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/products/${id}/`);
    return response.data;
  },
};


export default api;