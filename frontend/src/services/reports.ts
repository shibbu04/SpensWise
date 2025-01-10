import api from './api';
import { ExpenseReport, ReportType } from '../types/report';

export async function generateReport(type: ReportType): Promise<ExpenseReport> {
  try {
    const response = await api.get(`/api/reports/${type}`);
    return response.data;
  } catch (error: any) {
    console.error('Generate report error:', error);
    throw new Error(error.response?.data?.message || 'Failed to generate report');
  }
}

export async function getExpenseAnalytics() {
  try {
    const response = await api.get('/api/reports/analytics');
    return response.data;
  } catch (error: any) {
    console.error('Get analytics error:', error);
    throw new Error(error.response?.data?.message || 'Failed to get analytics');
  }
}