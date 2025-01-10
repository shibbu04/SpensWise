import React from 'react';
import { Header } from '../../components/layout/Header';
import { Sidebar } from './components/Sidebar';
import { ExpenseOverview } from './components/ExpenseOverview';
import { RecentExpenses } from './components/RecentExpenses';
import { Reports } from './components/Reports';
import { UserMenu } from './components/UserMenu';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-dark-bg md:flex-row">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 overflow-x-hidden">
        <div className="flex flex-col items-start justify-between gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <UserMenu />
        </div>
        
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
            <ExpenseOverview />
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-2">
                <RecentExpenses />
              </div>
              <div className="w-full">
                <Reports />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}