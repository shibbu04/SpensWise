export interface ExpenseReport {
  period: string;
  totalExpenses: number;
  expenses: {
    category: string;
    description: string;
    amount: number;
    date: string;
  }[];
  generatedAt: string;
}

export type ReportType = 'monthly' | 'yearly';