import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthUser } from '@/types';
import { getUsers, getSession, setSession, clearSession, initializeData } from '@/services/storage';

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => string | null;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeData();
    const session = getSession();
    if (session) {
      const { password, ...authUser } = session;
      setUser(authUser);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): string | null => {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return 'Credenciales inválidas';
    setSession(found);
    const { password: _, ...authUser } = found;
    setUser(authUser);
    return null;
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
