import React from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';

interface EditSalaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSalary: number;
}

export function EditSalaryModal({ isOpen, onClose, currentSalary }: EditSalaryModalProps) {
  const { user, setUser } = useAuth();
  const [salary, setSalary] = React.useState(currentSalary.toString());
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newSalary = Number(salary);
    if (newSalary < 0) {
      toast.error('Salary cannot be negative');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.patch(`/api/users/${user.id}`, {
        monthlySalary: newSalary
      });
      
      setUser({ ...user, monthlySalary: newSalary });
      toast.success('Salary updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update salary');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl dark:bg-dark-card">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
            Update Monthly Salary
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-bg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Monthly Salary"
            type="number"
            required
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            min="0"
            step="1"
            placeholder="Enter your monthly salary"
          />
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Salary'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}