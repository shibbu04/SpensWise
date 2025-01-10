import axios from 'axios';
import { CreateExpenseDTO, Expense } from '../types/expense';

const API_URL = import.meta.env.VITE_API_URL;

export async function getExpenses(): Promise<Expense[]> {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function createExpense(data: CreateExpenseDTO): Promise<Expense> {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/expenses`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function deleteExpense(id: string): Promise<void> {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/expenses/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}