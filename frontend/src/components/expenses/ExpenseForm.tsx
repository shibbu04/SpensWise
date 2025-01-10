import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const EXPENSE_CATEGORIES = [
  'Food and Beverage',
  'Loan',
  'Clothing',
  'Movie',
  'Vegetables',
  'Ration',
  'Books',
  'Accessories',
  'Other'
] as const;

interface ExpenseFormProps {
  onSubmit: (data: {
    category: string;
    description: string;
    amount: number;
    date: string;
  }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ExpenseForm({ onSubmit, onCancel, isLoading }: ExpenseFormProps) {
  const [formData, setFormData] = React.useState({
    category: '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(formData.amount) <= 0) {
      alert('Amount must be greater than 0');
      return;
    }
    onSubmit({
      ...formData,
      amount: Number(formData.amount),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <select
          required
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
        >
          <option value="">Select a category</option>
          {EXPENSE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      <Input
        label="Description"
        required
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Enter expense description"
      />
      
      <Input
        label="Amount"
        type="number"
        required
        min="0.01"
        step="0.01"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        placeholder="Enter amount"
      />
      
      <Input
        label="Date"
        type="date"
        required
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
      
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Expense'}
        </Button>
      </div>
    </form>
  );
}