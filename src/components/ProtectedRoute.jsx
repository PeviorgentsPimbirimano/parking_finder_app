import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const userSession = localStorage.getItem('userSession');
  
  if (!userSession) {
    // Redirect to login if no session
    return <Navigate to="/login" replace />;
  }

  try {
    const session = JSON.parse(userSession);
    const loginTime = new Date(session.loginTime);
    const now = new Date();
    const hoursSinceLogin = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
    
    // Session expires after 24 hours
    if (hoursSinceLogin > 24) {
      localStorage.removeItem('userSession');
      return <Navigate to="/login" replace />;
    }
    
    // Check if user has required role
    if (requiredRole && session.role !== requiredRole) {
      // Redirect to appropriate dashboard based on actual role
      if (session.role === 'driver') {
        return <Navigate to="/dashboard/driver" replace />;
      } else if (session.role === 'owner') {
        return <Navigate to="/dashboard/owner" replace />;
      } else {
        return <Navigate to="/login" replace />;
      }
    }
    
    return <>{children}</>;
  } catch (error) {
    // Invalid session data
    localStorage.removeItem('userSession');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;