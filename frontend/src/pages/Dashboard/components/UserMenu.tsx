import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/ui/Button';

export function UserMenu() {
  const { user, logout } = useAuth();

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-start">
      <span className="text-sm text-gray-600 dark:text-gray-400 sm:mr-4">
        {user?.fullName}
      </span>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={logout}
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </div>
  );
}