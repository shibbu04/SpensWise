import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL;

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  monthlySalary: string;
  mobileNumber: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  fullName: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await axios.post(`${API_URL}api/auth/register`, data);
  return response.data;
};


export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};


export const loginUser = async (data: LoginData) => {
  try {
    // console.log('Attempting login with:', { email: data.email });
    
    const response = await axios.post(`${API_URL}api/auth/login`, data);
    // console.log('Raw login response:', response); // Debug full response
    
    const { token, user, success } = response.data;
    // console.log('Parsed response data:', { hasToken: !!token, hasUser: !!user, success });

    if (!token) {
      console.error('No token received from server');
      throw new Error('No authentication token received');
    }

    if (!user) {
      console.error('No user data received from server');
      throw new Error('No user data received');
    }

    // Store token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { user, token };
  } catch (error: any) {
    console.error('Login service error:', error.response?.data || error.message);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  const token = getAuthToken();
  const userStr = localStorage.getItem('user');
  
  if (!token || !userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    logout();
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

