import api from './api';

interface User {
  id: string;
  email: string;
  fullName: string;
  monthlySalary: number;
}

export const updateUserSalary = async (userId: string, monthlySalary: number) => {
  const response = await api.patch(`/api/users/${userId}`, { monthlySalary });
  return response.data;
};

export const getUserProfile = async (userId: string) => {
  const response = await api.get(`/api/users/${userId}`);
  return response.data;
};