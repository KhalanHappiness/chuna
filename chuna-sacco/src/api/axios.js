import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
          headers: { Authorization: `Bearer ${refreshToken}` }
        });

        const { access_token } = response.data;
        localStorage.setItem('access_token', access_token);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API methods
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  changePassword: (data) => api.post('/auth/change-password', data),
};

export const adminAPI = {
  // Dashboard
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  
  // Sliders
  getSliders: () => api.get('/admin/sliders'),
  createSlider: (formData) => api.post('/admin/sliders', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateSlider: (id, formData) => api.put(`/admin/sliders/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteSlider: (id) => api.delete(`/admin/sliders/${id}`),
  
  // News
  getNews: () => api.get('/admin/news'),
  createNews: (formData) => api.post('/admin/news', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateNews: (id, formData) => api.put(`/admin/news/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteNews: (id) => api.delete(`/admin/news/${id}`),
  
  // Departments
  getDepartments: (includeStaff = false) => api.get(`/admin/departments?include_staff=${includeStaff}`),
  createDepartment: (data) => api.post('/admin/departments', data),
  updateDepartment: (id, data) => api.put(`/admin/departments/${id}`, data),
  deleteDepartment: (id) => api.delete(`/admin/departments/${id}`),
  
  // Staff
  getStaff: (departmentId = null) => api.get(`/admin/staff${departmentId ? `?department_id=${departmentId}` : ''}`),
  createStaff: (formData) => api.post('/admin/staff', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateStaff: (id, formData) => api.put(`/admin/staff/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteStaff: (id) => api.delete(`/admin/staff/${id}`),
  
  // Board Members
  getBoard: () => api.get('/admin/board'),
  createBoardMember: (formData) => api.post('/admin/board', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateBoardMember: (id, formData) => api.put(`/admin/board/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteBoardMember: (id) => api.delete(`/admin/board/${id}`),
  
  // Products
  getProducts: () => api.get('/admin/products'),
  getProductCategories: () => api.get('/admin/product-categories'),
  createProduct: (data) => api.post('/admin/products', data),
  updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  
  // Forms
  getForms: () => api.get('/admin/forms'),
  uploadForm: (formData) => api.post('/admin/forms', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateForm: (id, formData) => api.put(`/admin/forms/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteForm: (id) => api.delete(`/admin/forms/${id}`),
  
  // About Content
  getAboutContent: () => api.get('/admin/about'),
  updateAboutSection: (sectionKey, formData) => api.put(`/admin/about/${sectionKey}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Values
  getValues: () => api.get('/admin/values'),
  createValue: (data) => api.post('/admin/values', data),
  updateValue: (id, data) => api.put(`/admin/values/${id}`, data),
  deleteValue: (id) => api.delete(`/admin/values/${id}`),
  
  // Awards
  getAwards: () => api.get('/admin/awards'),
  createAward: (formData) => api.post('/admin/awards', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateAward: (id, formData) => api.put(`/admin/awards/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteAward: (id) => api.delete(`/admin/awards/${id}`),
};

export default api;