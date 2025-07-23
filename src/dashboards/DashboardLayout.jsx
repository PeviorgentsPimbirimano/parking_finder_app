import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, LogOut, MapPin, Calendar, CreditCard, Car, User, Settings, Users, BarChart3, AlertTriangle } from 'lucide-react';

const DashboardLayout = ({ children, userType, activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (userType === 'admin') {
      localStorage.removeItem('adminSession');
      navigate('/admin/login');
    } else {
      localStorage.removeItem('userSession');
      navigate('/login');
    }
  };

  const handleTabClick = (tabName) => {
    if (setActiveTab) {
      setActiveTab(tabName);
    }
  };

  const getNavigationLinks = () => {
    switch (userType) {
      case 'driver':
        return (
          <>
            <button 
              onClick={() => handleTabClick('search')} 
              className={`nav-link ${activeTab === 'search' ? 'active' : ''}`}
            >
              <MapPin size={20} />
              Find Parking
            </button>
            <button 
              onClick={() => handleTabClick('bookings')} 
              className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
            >
              <Calendar size={20} />
              My Bookings
            </button>
            <button 
              onClick={() => handleTabClick('payments')} 
              className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`}
            >
              <CreditCard size={20} />
              Payments
            </button>
            <button 
              onClick={() => handleTabClick('vehicles')} 
              className={`nav-link ${activeTab === 'vehicles' ? 'active' : ''}`}
            >
              <Car size={20} />
              My Vehicles
            </button>
            <button 
              onClick={() => handleTabClick('profile')} 
              className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
            >
              <User size={20} />
              Profile
            </button>
          </>
        );
      case 'owner':
        return (
          <>
            <button 
              onClick={() => handleTabClick('spaces')} 
              className={`nav-link ${activeTab === 'spaces' ? 'active' : ''}`}
            >
              <MapPin size={20} />
              My Spaces
            </button>
            <button 
              onClick={() => handleTabClick('bookings')} 
              className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
            >
              <Calendar size={20} />
              Bookings
            </button>
            <button 
              onClick={() => handleTabClick('earnings')} 
              className={`nav-link ${activeTab === 'earnings' ? 'active' : ''}`}
            >
              <CreditCard size={20} />
              Earnings
            </button>
            <button 
              onClick={() => handleTabClick('analytics')} 
              className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
            >
              <BarChart3 size={20} />
              Analytics
            </button>
            <button 
              onClick={() => handleTabClick('profile')} 
              className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
            >
              <User size={20} />
              Profile
            </button>
          </>
        );
      case 'admin':
        return (
          <>
            <button 
              onClick={() => handleTabClick('overview')} 
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            >
              <BarChart3 size={20} />
              Overview
            </button>
            <button 
              onClick={() => handleTabClick('users')} 
              className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            >
              <Users size={20} />
              Users
            </button>
            <button 
              onClick={() => handleTabClick('spaces')} 
              className={`nav-link ${activeTab === 'spaces' ? 'active' : ''}`}
            >
              <MapPin size={20} />
              Parking Spaces
            </button>
            <button 
              onClick={() => handleTabClick('bookings')} 
              className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
            >
              <Calendar size={20} />
              Bookings
            </button>
            <button 
              onClick={() => handleTabClick('payments')} 
              className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`}
            >
              <CreditCard size={20} />
              Payments
            </button>
            <button 
              onClick={() => handleTabClick('reports')} 
              className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`}
            >
              <AlertTriangle size={20} />
              Reports
            </button>
            <button 
              onClick={() => handleTabClick('settings')} 
              className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
            >
              <Settings size={20} />
              Settings
            </button>
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
            <h1>Spot <span>On</span></h1>
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