import React from 'react';
import { Header } from '../components/layout/Header';
import { Sidebar } from './Dashboard/components/Sidebar';
import { RecentExpenses } from './Dashboard/components/RecentExpenses';
import { UserMenu } from './Dashboard/components/UserMenu';

export default function ExpensesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <UserMenu />
        </div>

        {/* Main Section */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <RecentExpenses />
          </div>
        </main>
      </div>
    </div>
  );
}
