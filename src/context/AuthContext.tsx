import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  demoLogin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    // Simulate login, create a new user if not found
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      setUser(existingUser);
    } else {
      const newUser: User = {
        id: `u_${Math.random().toString(36).substr(2, 9)}`,
        email,
        name: email.split('@')[0],
        avatar: `https://i.pravatar.cc/150?u=${email}`
      };
      setUser(newUser);
    }
  };

  const demoLogin = () => {
    setUser(mockUsers[0]); // Login as Alex Johnson
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, demoLogin, logout }}>
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
