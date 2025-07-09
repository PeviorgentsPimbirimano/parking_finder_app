import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, LogOut, MapPin, Calendar, CreditCard, Car, User, Settings, Users, BarChart3, AlertTriangle } from 'lucide-react';

const DashboardLayout = ({ children, userType }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (userType === 'admin') {
      localStorage.removeItem('adminSession');
      navigate('/admin/login');
    } else {
      // Handle regular user logout
      navigate('/login');
    }
  };

  const getNavigationLinks = () => {
    switch (userType) {
      case 'driver':
        return (
          <>
            <Link to="/dashboard/driver" className="nav-link">
              <MapPin size={20} />
              Find Parking
            </Link>
            <Link to="/dashboard/driver" className="nav-link">
              <Calendar size={20} />
              My Bookings
            </Link>
            <Link to="/dashboard/driver" className="nav-link">
              <CreditCard size={20} />
              Payments
            </Link>
            <Link to="/dashboard/driver" className="nav-link">
              <Car size={20} />
              My Vehicles
            </Link>
            <Link to="/dashboard/driver" className="nav-link">
              <User size={20} />
              Profile
            </Link>
          </>
        );
      case 'owner':
        return (
          <>
            <Link to="/dashboard/owner" className="nav-link">
              <MapPin size={20} />
              My Spaces
            </Link>
            <Link to="/dashboard/owner" className="nav-link">
              <Calendar size={20} />
              Bookings
            </Link>
            <Link to="/dashboard/owner" className="nav-link">
              <CreditCard size={20} />
              Earnings
            </Link>
            <Link to="/dashboard/owner" className="nav-link">
              <BarChart3 size={20} />
              Analytics
            </Link>
            <Link to="/dashboard/owner" className="nav-link">
              <User size={20} />
              Profile
            </Link>
          </>
        );
      case 'admin':
        return (
          <>
            <Link to="/dashboard/admin" className="nav-link">
              <BarChart3 size={20} />
              Overview
            </Link>
            <Link to="/dashboard/admin" className="nav-link">
              <Users size={20} />
              Users
            </Link>
            <Link to="/dashboard/admin" className="nav-link">
              <MapPin size={20} />
              Parking Spaces
            </Link>
            <Link to="/dashboard/admin" className="nav-link">
              <Calendar size={20} />
              Bookings
            </Link>
            <Link to="/dashboard/admin" className="nav-link">
              <CreditCard size={20} />
              Payments
            </Link>
            <Link to="/dashboard/admin" className="nav-link">
              <AlertTriangle size={20} />
              Reports
            </Link>
            <Link to="/dashboard/admin" className="nav-link">
              <Settings size={20} />
              Settings
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-layout">
      <nav className="dashboard-nav">
        <div className="nav-header">
          <Link to="/" className="nav-logo">
            <div className="logo">
              <h1>
                Spot <span>On</span>
              </h1>
            </div>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <Home size={20} />
            Back to Home
          </Link>
          {getNavigationLinks()}
        </div>
        <div className="nav-footer">
          <button onClick={handleLogout} className="nav-link logout-btn">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;