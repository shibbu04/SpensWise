import React from 'react';
import { toast } from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { ExpenseModal } from '../../../components/expenses/ExpenseModal';
import { CreateExpenseDTO, Expense } from '../../../types/expense';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

export function RecentExpenses() {
  const { user } = useAuth();
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchExpenses = React.useCallback(async () => {
    if (!user) return;
    try {
      const response = await api.get('api/expenses', {
        params: { userId: user.id }
      });
      setExpenses(response.data);
    } catch (error) {
      toast.error('Failed to fetch expenses');
    }
  }, [user]);

  React.useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleAddExpense = async (data: CreateExpenseDTO) => {
    if (!user) return;
    setIsLoading(true);
    try {
      await api.post('api/expenses', {
        ...data,
        userId: user.id
      });
      await fetchExpenses();
      setIsModalOpen(false);
      toast.success('Expense added successfully');
    } catch (error) {
      toast.error('Failed to add expense');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (!user) return;
    try {
      await api.delete(`api/expenses/${id}`, {
        params: { userId: user.id }
      });
      await fetchExpenses();
      toast.success('Expense deleted successfully');
    } catch (error) {
      toast.error('Failed to delete expense');
    }
  };

  return (
    <>
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-dark-card">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
            Recent Expenses
          </h2>
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            Add New
          </Button>
        </div>

        <div className="space-y-4">
          {expenses.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No expenses found. Add your first expense!
            </p>
          ) : (
            expenses.map((expense) => (
              <div
                key={expense._id}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-4 dark:border-dark-border"
              >
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-dark-text">
                    {expense.category}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {expense.description}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium text-gray-900 dark:text-dark-text">
                    ₹{expense.amount.toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleDeleteExpense(expense._id)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600 dark:hover:bg-dark-bg"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddExpense}
        isLoading={isLoading}
      />
    </>
  );
}