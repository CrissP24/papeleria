import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role as UserRole)) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
