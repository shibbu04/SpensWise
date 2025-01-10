import React from 'react';
import { Header } from '../components/layout/Header';
import { Sidebar } from './Dashboard/components/Sidebar';
import { Reports } from './Dashboard/components/Reports';
import { UserMenu } from './Dashboard/components/UserMenu';

export default function ReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1">
        <div className="flex flex-col items-start justify-between gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <UserMenu />
        </div>
        
        <main className="p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Reports />
          </div>
        </main>
      </div>
    </div>
  );
}