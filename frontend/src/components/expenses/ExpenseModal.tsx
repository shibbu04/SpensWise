import React from 'react';
import { X } from 'lucide-react';
import { ExpenseForm } from './ExpenseForm';
import { CreateExpenseDTO } from '../../types/expense';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateExpenseDTO) => void;
  isLoading?: boolean;
}

export function ExpenseModal({ isOpen, onClose, onSubmit, isLoading }: ExpenseModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl dark:bg-dark-card">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
            Add New Expense
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-bg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ExpenseForm onSubmit={onSubmit} onCancel={onClose} isLoading={isLoading} />
      </div>
    </>
  );
}