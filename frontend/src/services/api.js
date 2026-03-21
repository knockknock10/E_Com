import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true // For sending HttpOnly cookies (refresh token)
});

// Request Interceptor
api.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Response Interceptor for handling token refresh
api.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config;

  // If the error status is 401 and there is no originalRequest._retry flag,
  // it means the token has expired and we need to refresh it
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/refresh', {}, {
        withCredentials: true
      });
      const newAccessToken = res.data.token;

      // Update the auth store
      const {
        user
      } = useAuthStore.getState();
      if (user) {
        useAuthStore.getState().login(user, newAccessToken);
      }

      // Retry the original request with the new token
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (err) {
      // Refresh token failed, force logout
      useAuthStore.getState().logout();
      return Promise.reject(err);
    }
  }
  return Promise.reject(error);
});
export default api;