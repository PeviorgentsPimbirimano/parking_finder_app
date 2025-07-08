import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  CreditCard, 
  Star, 
  Search, 
  Filter,
  User,
  Settings,
  LogOut,
  Car,
  History,
  Heart
} from 'lucide-react';
import '../css/Dashboard.css';

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');

  const mockParkingSpots = [
    {
      id: 1,
      name: 'Downtown Plaza Parking',
      address: '123 Main St, Downtown',
      price: 15,
      rating: 4.8,
      distance: '0.3 miles',
      image: 'https://images.pexels.com/photos/63294/autos-cars-car-lot-dealer-63294.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      features: ['Covered', 'Security Camera', '24/7 Access']
    },
    {
      id: 2,
      name: 'Central Mall Spot',
      address: '456 Oak Ave, Central',
      price: 12,
      rating: 4.6,
      distance: '0.5 miles',
      image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: true,
      features: ['Ground Level', 'Well Lit', 'Easy Access']
    },
    {
      id: 3,
      name: 'Business District Garage',
      address: '789 Pine St, Business District',
      price: 20,
      rating: 4.9,
      distance: '0.8 miles',
      image: 'https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=400',
      available: false,
      features: ['Valet Service', 'Premium Location', 'Covered']
    }
  ];

  const mockBookings = [
    {
      id: 1,
      location: 'Downtown Plaza Parking',
      date: '2024-01-15',
      time: '09:00 AM - 05:00 PM',
      status: 'Active',
      price: 15
    },
    {
      id: 2,
      location: 'Central Mall Spot',
      date: '2024-01-12',
      time: '02:00 PM - 06:00 PM',
      status: 'Completed',
      price: 12
    },
    {
      id: 3,
      location: 'Business District Garage',
      date: '2024-01-10',
      time: '08:00 AM - 10:00 AM',
      status: 'Cancelled',
      price: 20
    }
  ];

  const renderSearchTab = () => (
    <div className="tab-content">
      <div className="search-section">
        <h2>Find Your Perfect Parking Spot</h2>
        <div className="search-form">
          <div className="form-group">
            <label htmlFor="location">
              <MapPin size={20} />
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Enter location or address"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">
                <Calendar size={20} />
                Date
              </label>
              <input
                type="date"
                id="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">
                <Clock size={20} />
                Time
              </label>
              <input
                type="time"
                id="time"
                value={searchTime}
                onChange={(e) => setSearchTime(e.target.value)}
              />
            </div>
          </div>
          <button className="search-btn">
            <Search size={20} />
            Search Parking Spots
          </button>
        </div>
      </div>

      <div className="search-results">
        <div className="results-header">
          <h3>Available Parking Spots</h3>
          <button className="filter-btn">
            <Filter size={20} />
            Filter
          </button>
        </div>
        <div className="parking-spots">
          {mockParkingSpots.map(spot => (
            <div key={spot.id} className={`parking-card ${!spot.available ? 'unavailable' : ''}`}>
              <div className="card-image">
                <img src={spot.image} alt={spot.name} />
                <div className="card-overlay">
                  <button className="favorite-btn">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
              <div className="card-content">
                <h4>{spot.name}</h4>
                <p className="address">
                  <MapPin size={16} />
                  {spot.address}
                </p>
                <div className="card-details">
                  <div className="rating">
                    <Star size={16} fill="gold" />
                    <span>{spot.rating}</span>
                  </div>
                  <div className="distance">{spot.distance}</div>
                </div>
                <div className="features">
                  {spot.features.map(feature => (
                    <span key={feature} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <div className="card-footer">
                  <div className="price">${spot.price}/day</div>
                  <button 
                    className={`book-btn ${!spot.available ? 'disabled' : ''}`}
                    disabled={!spot.available}
                  >
                    {spot.available ? 'Book Now' : 'Unavailable'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBookingsTab = () => (
    <div className="tab-content">
      <div className="bookings-section">
        <h2>My Bookings</h2>
        <div className="bookings-list">
          {mockBookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-info">
                <h4>{booking.location}</h4>
                <p className="booking-date">
                  <Calendar size={16} />
                  {booking.date}
                </p>
                <p className="booking-time">
                  <Clock size={16} />
                  {booking.time}
                </p>
              </div>
              <div className="booking-details">
                <div className={`status ${booking.status.toLowerCase()}`}>
                  {booking.status}
                </div>
                <div className="booking-price">${booking.price}</div>
              </div>
              <div className="booking-actions">
                {booking.status === 'Active' && (
                  <>
                    <button className="btn-secondary">Extend</button>
                    <button className="btn-danger">Cancel</button>
                  </>
                )}
                {booking.status === 'Completed' && (
                  <button className="btn-primary">Book Again</button>
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
            <input type="text" id="fullName" defaultValue="John Doe" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" defaultValue="john.doe@email.com" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" defaultValue="+1 (555) 123-4567" />
          </div>
          <div className="form-group">
            <label htmlFor="vehicle">Vehicle Information</label>
            <input type="text" id="vehicle" defaultValue="Toyota Camry - ABC123" />
          </div>
          <button className="save-btn">Save Changes</button>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout userType="driver">
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Driver Dashboard</h1>
          <div className="user-info">
            <div className="user-avatar">
              <User size={24} />
            </div>
            <div className="user-details">
              <h3>John Doe</h3>
              <p>Driver</p>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            <Search size={20} />
            Search Parking
          </button>
          <button 
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar size={20} />
            My Bookings
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
          {activeTab === 'search' && renderSearchTab()}
          {activeTab === 'bookings' && renderBookingsTab()}
          {activeTab === 'profile' && renderProfileTab()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DriverDashboard;