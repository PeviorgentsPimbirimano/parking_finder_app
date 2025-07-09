import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const adminSession = localStorage.getItem('adminSession');
  
  if (!adminSession) {
    // Redirect to admin login if no session
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const session = JSON.parse(adminSession);
    const loginTime = new Date(session.loginTime);
    const now = new Date();
    const hoursSinceLogin = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
    
    // Session expires after 8 hours
    if (hoursSinceLogin > 8) {
      localStorage.removeItem('adminSession');
      return <Navigate to="/admin/login" replace />;
    }
    
    // Check if user has admin role
    if (session.role !== 'admin') {
      return <Navigate to="/admin/login" replace />;
    }
    
    return <>{children}</>;
  } catch (error) {
    // Invalid session data
    localStorage.removeItem('adminSession');
    return <Navigate to="/admin/login" replace />;
  }
};

export default AdminRoute;