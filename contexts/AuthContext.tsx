"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getCurrentUser, setCurrentUser, getAllUsers, addUser, initializeDemoData } from '@/lib/localStorage';
import { toast } from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: 'tutor' | 'parent' | 'admin') => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: 'tutor' | 'parent' | 'admin') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeDemoData();
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'tutor' | 'parent' | 'admin'): Promise<boolean> => {
    try {
      const users = getAllUsers();
      const foundUser = users.find(u => u.email === email && u.role === role);

      if (foundUser) {
        setUser(foundUser);
        setCurrentUser(foundUser);
        toast.success(`Welcome back, ${foundUser.name}!`);
        return true;
      } else {
        toast.error('Invalid credentials or role mismatch');
        return false;
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string, role: 'tutor' | 'parent' | 'admin'): Promise<boolean> => {
    try {
      const users = getAllUsers();
      const existingUser = users.find(u => u.email === email);

      if (existingUser) {
        toast.error('User already exists with this email');
        return false;
      }

      const newUser: User = {
        id: `${role}-${Date.now()}`,
        email,
        name,
        role,
        createdAt: new Date().toISOString(),
      };

      addUser(newUser);
      setUser(newUser);
      setCurrentUser(newUser);
      toast.success(`Welcome, ${name}!`);
      return true;
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
