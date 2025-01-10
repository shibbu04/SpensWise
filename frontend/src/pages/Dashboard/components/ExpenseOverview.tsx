import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, PiggyBank, TrendingUp, BarChart3, Edit2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import { EditSalaryModal } from './EditSalaryModal';

export function ExpenseOverview({ totalExpenses = 0, categories = [] }) {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const monthlySalary = user?.monthlySalary || 0;
  const yearlySalary = monthlySalary * 12;
  const remainingBudget = React.useMemo(
    () => monthlySalary - totalExpenses,
    [monthlySalary, totalExpenses]
  );

  const stats = React.useMemo(
    () => [
      {
        icon: Wallet,
        label: 'Monthly Salary',
        value: `₹${monthlySalary.toLocaleString()}`,
        subtext: `Yearly: ₹${yearlySalary.toLocaleString()}`,
        iconClassName: 'text-blue-600 dark:text-blue-400',
        bgClassName: 'bg-blue-50 dark:bg-blue-900/20',
        action: (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditModalOpen(true)}
            className="absolute right-3 top-3 sm:right-4 sm:top-4"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        )
      },
      {
        icon: PiggyBank,
        label: 'Remaining Budget',
        value: `₹${remainingBudget.toLocaleString()}`,
        subtext: `${((remainingBudget / monthlySalary) * 100).toFixed(1)}% remaining`,
        iconClassName: 'text-green-600 dark:text-green-400',
        bgClassName: 'bg-green-50 dark:bg-green-900/20'
      },
      {
        icon: TrendingUp,
        label: 'Total Expenses',
        value: `₹${totalExpenses.toLocaleString()}`,
        subtext: `${((totalExpenses / monthlySalary) * 100).toFixed(1)}% of salary`,
        iconClassName: 'text-red-600 dark:text-red-400',
        bgClassName: 'bg-red-50 dark:bg-red-900/20'
      },
      {
        icon: BarChart3,
        label: 'Categories',
        value: categories.length.toString(),
        subtext: 'Expense categories',
        iconClassName: 'text-purple-600 dark:text-purple-400',
        bgClassName: 'bg-purple-50 dark:bg-purple-900/20'
      }
    ],
    [monthlySalary, yearlySalary, remainingBudget, totalExpenses, categories]
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative rounded-xl bg-white p-4 shadow-sm dark:bg-dark-card sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div className={`rounded-lg p-2 sm:p-3 ${stat.bgClassName}`}>
                <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.iconClassName}`} />
              </div>
              {stat.action}
            </div>
            <div className="mt-3 sm:mt-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
              <p className="mt-1 break-words text-lg font-semibold text-gray-900 dark:text-dark-text sm:mt-2 sm:text-xl lg:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                {stat.subtext}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <EditSalaryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentSalary={monthlySalary}
      />
    </>
  );
}