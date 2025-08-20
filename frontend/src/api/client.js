// api/client.js
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import useAuthStore from '../store/authStore';

export const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Your Express server
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor (optional - for auth tokens)
api.interceptors.request.use((config) => {
      const { token } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    config.headers.Accept = `application/json`;
  }
  return config
})

// Response interceptor (optional - for error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('token')
      
      // Clear user data from cache
      const queryClient = useQueryClient()
      queryClient.setQueryData(['user'], null)
      
      // Redirect to login
      window.location.href = '/login'
      
      toast.error('Session expired. Please log in again.')
    }
    return Promise.reject(error)
  }
)