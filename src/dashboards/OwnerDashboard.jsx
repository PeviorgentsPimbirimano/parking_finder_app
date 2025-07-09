import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign, 
  Calendar, 
  Users, 
  MapPin,
  Star,
  TrendingUp,
  Eye,
  Settings,
  User,
  BarChart3
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import '../css/Dashboard.css';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('spaces');
  const [showAddListing, setShowAddListing] = useState(false);

  const mockListings = [
    {
      id: 1,
      title: 'Downtown Plaza Parking',
      address: '123 Main St, Downtown',
      price: 15,
      rating: 4.8,
      bookings: 24,
      revenue: 360,
      status: 'Active',
      image: 'https://images.pexels.com/photos/63294/autos-cars-car-lot-dealer-63294.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Central Mall Spot',
      address: '456 Oak Ave, Central',
      price: 12,
      rating: 4.6,
      bookings: 18,
      revenue: 216,
      status: 'Active',
      image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Business District Garage',
      address: '789 Pine St, Business District',
      price: 20,
      rating: 4.9,
      bookings: 31,
      revenue: 620,
      status: 'Inactive',
      image: 'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const mockBookings = [
    {
      id: 1,
      customerName: 'John Doe',
      location: 'Downtown Plaza Parking',
      date: '2024-01-15',
      time: '09:00 AM - 05:00 PM',
      status: 'Active',
      price: 15
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      location: 'Central Mall Spot',
      date: '2024-01-14',
      time: '02:00 PM - 06:00 PM',
      status: 'Completed',
      price: 12
    },
    {
      id: 3,
      customerName: 'Mike Johnson',
      location: 'Business District Garage',
      date: '2024-01-13',
      time: '08:00 AM - 10:00 AM',
      status: 'Upcoming',
      price: 20
    }
  ];

  const renderOverviewTab = () => (
    <div className="tab-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h3>$1,196</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <h3>73</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <MapPin size={24} />
          </div>
          <div className="stat-info">
            <h3>3</h3>
            <p>Active Listings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Star size={24} />
          </div>
          <div className="stat-info">
            <h3>4.8</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      <div className="overview-charts">
        <div className="chart-section">
          <h3>Revenue Trends</h3>
          <div className="chart-placeholder">
            <BarChart3 size={48} />
            <p>Revenue chart would go here</p>
          </div>
        </div>
        <div className="chart-section">
          <h3>Booking Analytics</h3>
          <div className="chart-placeholder">
            <TrendingUp size={48} />
            <p>Booking trends would go here</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderListingsTab = () => (
    <div className="tab-content">
      <div className="listings-header">
        <h2>My Listings</h2>
        <button className="add-listing-btn" onClick={() => setShowAddListing(true)}>
          <Plus size={20} />
          Add New Listing
        </button>
      </div>

      <div className="listings-grid">
        {mockListings.map(listing => (
          <div key={listing.id} className="listing-card">
            <div className="listing-image">
              <img src={listing.image} alt={listing.title} />
              <div className={`status-badge ${listing.status.toLowerCase()}`}>
                {listing.status}
              </div>
            </div>
            <div className="listing-content">
              <h4>{listing.title}</h4>
              <p className="address">
                <MapPin size={16} />
                {listing.address}
              </p>
              <div className="listing-stats">
                <div className="stat">
                  <span className="label">Price:</span>
                  <span className="value">${listing.price}/day</span>
                </div>
                <div className="stat">
                  <span className="label">Rating:</span>
                  <span className="value">
                    <Star size={14} fill="gold" />
                    {listing.rating}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Bookings:</span>
                  <span className="value">{listing.bookings}</span>
                </div>
                <div className="stat">
                  <span className="label">Revenue:</span>
                  <span className="value">${listing.revenue}</span>
                </div>
              </div>
              <div className="listing-actions">
                <button className="btn-secondary">
                  <Edit size={16} />
                  Edit
                </button>
                <button className="btn-secondary">
                  <Eye size={16} />
                  View
                </button>
                <button className="btn-danger">
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddListing && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Listing</h3>
              <button className="close-btn" onClick={() => setShowAddListing(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="Enter listing title" />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" placeholder="Enter parking address" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price per day</label>
                  <input type="number" id="price" placeholder="15" />
                </div>
                <div className="form-group">
                  <label htmlFor="spaces">Number of spaces</label>
                  <input type="number" id="spaces" placeholder="1" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" placeholder="Describe your parking space..."></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="image">Upload Image</label>
                <input type="file" id="image" accept="image/*" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowAddListing(false)}>
                Cancel
              </button>
              <button className="btn-primary">
                Add Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderBookingsTab = () => (
    <div className="tab-content">
      <div className="bookings-section">
        <h2>Customer Bookings</h2>
        <div className="bookings-list">
          {mockBookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-info">
                <h4>{booking.customerName}</h4>
                <p className="booking-location">
                  <MapPin size={16} />
                  {booking.location}
                </p>
                <p className="booking-date">
                  <Calendar size={16} />
                  {booking.date} • {booking.time}
                </p>
              </div>
              <div className="booking-details">
                <div className={`status ${booking.status.toLowerCase()}`}>
                  {booking.status}
                </div>
                <div className="booking-price">${booking.price}</div>
              </div>
              <div className="booking-actions">
                <button className="btn-secondary">Contact</button>
                {booking.status === 'Active' && (
                  <button className="btn-primary">Extend</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="tab-content">
      <div className="profile-section">
        <h2>Profile Settings</h2>
        <div className="profile-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" defaultValue="Sarah Johnson" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" defaultValue="sarah.johnson@email.com" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" defaultValue="+1 (555) 987-6543" />
          </div>
          <div className="form-group">
            <label htmlFor="bankAccount">Bank Account</label>
            <input type="text" id="bankAccount" defaultValue="****-****-****-1234" />
          </div>
          <button className="save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );

  const renderEarningsTab = () => (
    <div className="tab-content">
      <div className="earnings-section">
        <h2>Earnings Overview</h2>
        <div className="earnings-stats">
          <div className="earning-card">
            <h3>This Month</h3>
            <div className="amount">$456</div>
          </div>
          <div className="earning-card">
            <h3>Total Earnings</h3>
            <div className="amount">$1,196</div>
          </div>
          <div className="earning-card">
            <h3>Pending Payouts</h3>
            <div className="amount">$89</div>
          </div>
        </div>
        <div className="earnings-history">
          <h3>Recent Payments</h3>
          <div className="payment-list">
            <div className="payment-item">
              <div className="payment-details">
                <span className="date">Jan 15, 2024</span>
                <span className="description">Downtown Plaza Parking - 8 hours</span>
              </div>
              <div className="amount">+$120</div>
            </div>
            <div className="payment-item">
              <div className="payment-details">
                <span className="date">Jan 12, 2024</span>
                <span className="description">Central Mall Spot - 4 hours</span>
              </div>
              <div className="amount">+$48</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="tab-content">
      <div className="analytics-section">
        <h2>Performance Analytics</h2>
        <div className="analytics-grid">
          <div className="analytics-card">
            <h3>Occupancy Rate</h3>
            <div className="metric">78%</div>
            <p>Average across all spaces</p>
          </div>
          <div className="analytics-card">
            <h3>Average Booking Duration</h3>
            <div className="metric">4.2 hrs</div>
            <p>Per booking session</p>
          </div>
          <div className="analytics-card">
            <h3>Revenue per Space</h3>
            <div className="metric">$398</div>
            <p>Monthly average</p>
          </div>
        </div>
        <div className="chart-section">
          <h3>Monthly Revenue Trend</h3>
          <div className="chart-placeholder">
            <BarChart3 size={48} />
            <p>Revenue chart would go here</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout userType="owner">
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Owner Dashboard</h1>
          <div className="user-info">
            <div className="user-avatar">
              <User size={24} />
            </div>
            <div className="user-details">
              <h3>Sarah Johnson</h3>
              <p>Space Owner</p>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'spaces' ? 'active' : ''}`}
            onClick={() => setActiveTab('spaces')}
          >
            <MapPin size={20} />
            My Spaces
          </button>
          <button 
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar size={20} />
            Bookings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'earnings' ? 'active' : ''}`}
            onClick={() => setActiveTab('earnings')}
          >
            <DollarSign size={20} />
            Earnings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={20} />
            Analytics
          </button>
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={20} />
            Profile
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'spaces' && renderListingsTab()}
          {activeTab === 'bookings' && renderBookingsTab()}
          {activeTab === 'earnings' && renderEarningsTab()}
          {activeTab === 'analytics' && renderAnalyticsTab()}
          {activeTab === 'profile' && renderProfileTab()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OwnerDashboard;