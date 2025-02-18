import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/auth', // Adjust with your actual backend URL
  withCredentials: true, // Ensures cookies are sent with requests
});

// Signup
export const signup = async (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const response = await api.post('/signup', data);
  return response.data;
};

// Login
export const login = async (data: { email: string; password: string }) => {
  const response = await api.post('/login', data);
  return response.data;
};

// Signout
export const signout = async () => {
  const response = await api.post('/signout');
  return response.data;
};

// Get profile
export const getProfile = async () => {
  const response = await api.get('/profile');
  return response.data;
};
