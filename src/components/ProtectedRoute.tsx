import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType: 'farmer' | 'investor';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredUserType 
}) => {
  // ✅ FIX: Use the same keys as AuthContext
  const userData = localStorage.getItem('user'); // was 'user'
  const token = localStorage.getItem('token');   // was 'token'
  
  const user = userData ? JSON.parse(userData) : null;

  console.log('🔐 ProtectedRoute Check:');
  console.log('📱 User data:', user);
  console.log('🔑 Token exists:', !!token);

  if (!user || !token) {
    console.log('❌ No user or token - redirecting to signin');
    return <Navigate to="/signin" replace />;
  }

  if (user.userType !== requiredUserType) {
    console.log('❌ User type mismatch - redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('✅ Access granted to protected route');
  return <>{children}</>;
};

export default ProtectedRoute;