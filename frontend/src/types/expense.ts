export interface Expense {
  id: string;
  userId: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  createdAt: string;
}

export interface CreateExpenseDTO {
  category: string;
  description: string;
  amount: number;
  date: string;
}