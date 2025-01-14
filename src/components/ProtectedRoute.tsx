import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LoadingRoute from './LoadingRoute';

export default function ProtectedRoute() {
  const user = useAuthStore(state => state.user);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <LoadingRoute>
      <Outlet />
    </LoadingRoute>
  );
}