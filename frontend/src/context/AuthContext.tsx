import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../services/auth';
import { getUserProfile } from '../services/user';

interface User {
  id: string;
  email: string;
  fullName: string;
  monthlySalary: number;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  setUser: (user: User | null) => void;
  updateUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getCurrentUser());

  const updateUserData = async () => {
    if (user?.id) {
      try {
        const userData = await getUserProfile(user.id);
        setUser(prevUser => ({
          ...prevUser,
          ...userData
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    // Check token validity and fetch full user data on mount
    const initializeUser = async () => {
      const currentUser = getCurrentUser();
      if (currentUser?.id) {
        try {
          const userData = await getUserProfile(currentUser.id);
          setUser({
            ...currentUser,
            ...userData
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          logout();
        }
      }
    };

    initializeUser();
  }, []);

  const value = {
    user,
    logout,
    setUser,
    updateUserData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}