import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
console.log('API URL:', API_URL);

// Create axios instance - NO default Content-Type
const api = axios.create({
  baseURL: API_URL,
  // Remove the headers object completely
});

// Request interceptor - Add token and fix FormData
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // CRITICAL: If sending FormData, remove Content-Type to let browser set it
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    // For non-FormData, ensure JSON content type
    if (!(config.data instanceof FormData) && config.data && typeof config.data === 'object') {
      config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (keep as is)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
          headers: { Authorization: `Bearer ${refreshToken}` }
        });

        const { access_token } = response.data;
        localStorage.setItem('access_token', access_token);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
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

// Now simplify all API methods - remove manual headers
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
  createSlider: (formData) => api.post('/admin/sliders', formData), // Removed headers
  updateSlider: (id, formData) => api.put(`/admin/sliders/${id}`, formData), // Removed headers
  deleteSlider: (id) => api.delete(`/admin/sliders/${id}`),
  
  // News
  getNews: () => api.get('/admin/news'),
  createNews: (formData) => api.post('/admin/news', formData), // Removed headers
  updateNews: (id, formData) => api.put(`/admin/news/${id}`, formData), // Removed headers
  deleteNews: (id) => api.delete(`/admin/news/${id}`),
  
  // Rich text Editor
  uploadImage: (formData) => api.post('/admin/upload-image', formData), // Removed headers
  
  // Departments
  getDepartments: (includeStaff = false) => api.get(`/admin/departments?include_staff=${includeStaff}`),
  createDepartment: (data) => api.post('/admin/departments', data),
  updateDepartment: (id, data) => api.put(`/admin/departments/${id}`, data),
  deleteDepartment: (id) => api.delete(`/admin/departments/${id}`),
  
  // Staff
  getStaff: (departmentId = null) => api.get(`/admin/staff${departmentId ? `?department_id=${departmentId}` : ''}`),
  createStaff: (formData) => api.post('/admin/staff', formData), // Removed headers
  updateStaff: (id, formData) => api.put(`/admin/staff/${id}`, formData), // Removed headers
  deleteStaff: (id) => api.delete(`/admin/staff/${id}`),
  
  // Board Members
  getBoard: () => api.get('/admin/board'),
  createBoardMember: (formData) => api.post('/admin/board', formData), // Removed headers
  updateBoardMember: (id, formData) => api.put(`/admin/board/${id}`, formData), // Removed headers
  deleteBoardMember: (id) => api.delete(`/admin/board/${id}`),
  
  // Products
  getProducts: () => api.get('/admin/products'),
  getProductCategories: () => api.get('/admin/product-categories'),
  createProductCategory: (data) => api.post('/admin/product-categories', data),
  updateProductCategory: (id, data) => api.put(`/admin/product-categories/${id}`, data),
  deleteProductCategory: (id) => api.delete(`/admin/product-categories/${id}`),
  createProduct: (data) => api.post('/admin/products', data),
  updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  
  // Forms
  getForms: () => api.get('/admin/forms'),
  uploadForm: (formData) => api.post('/admin/forms', formData), // Removed headers
  updateForm: (id, formData) => api.put(`/admin/forms/${id}`, formData), // Removed headers
  deleteForm: (id) => api.delete(`/admin/forms/${id}`),

  // Albums
  getAlbums: () => api.get('/admin/albums'),
  createAlbum: (data) => api.post('/admin/albums', data), // Removed headers
  updateAlbum: (id, data) => api.put(`/admin/albums/${id}`, data), // Removed headers
  deleteAlbum: (id) => api.delete(`/admin/albums/${id}`),
  
  // Photos inside an album - NOW FIXED
  uploadPhotos: (albumId, data) => api.post(`/admin/albums/${albumId}/photos`, data),
  deletePhoto: (albumId, photoId) => api.delete(`/admin/albums/${albumId}/photos/${photoId}`),
  
  // About Content
  getAboutContent: () => api.get('/admin/about'),
  updateAboutSection: (sectionKey, formData) => api.put(`/admin/about/${sectionKey}`, formData), // Removed headers
  
  // Values
  getValues: () => api.get('/admin/values'),
  createValue: (data) => api.post('/admin/values', data),
  updateValue: (id, data) => api.put(`/admin/values/${id}`, data),
  deleteValue: (id) => api.delete(`/admin/values/${id}`),
  
  // Awards
  getAwards: () => api.get('/admin/awards'),
  createAward: (formData) => api.post('/admin/awards', formData), // Removed headers
  updateAward: (id, formData) => api.put(`/admin/awards/${id}`, formData), // Removed headers
  deleteAward: (id) => api.delete(`/admin/awards/${id}`),
};

export default api;