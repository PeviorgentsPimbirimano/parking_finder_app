import React, { useState, useEffect } from 'react';
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
  User,
  BarChart3,
  X,
  Download,
  MessageCircle,
  Clock
} from 'lucide-react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';
import DashboardLayout from './DashboardLayout';
import '../css/Dashboard.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.spoton-parking.com';
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('listings');
  const [loading, setLoading] = useState(false);
  const [ownerId] = useState(localStorage.getItem('ownerId') || 'owner_123');

  // Listings state
  const [listings, setListings] = useState([]);
  const [showAddListing, setShowAddListing] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);

  // Bookings state
  const [bookings, setBookings] = useState([]);

  // Earnings state
  const [earnings, setEarnings] = useState({
    monthly: 0,
    yearly: 0,
    pending: 0
  });
  const [payouts, setPayouts] = useState([]);

  // Analytics state
  const [analytics, setAnalytics] = useState({
    revenue: [],
    occupancy: [],
    listingViews: []
  });

  // Profile state
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    bankAccount: ''
  });

  // Form states
  const [listingForm, setListingForm] = useState({
    title: '',
    description: '',
    address: '',
    pricePerHour: '',
    totalSpots: '',
    imageUrl: '',
    lat: '',
    lng: ''
  });

  const mapContainerStyle = {
    width: '100%',
    height: '300px'
  };

  const defaultCenter = {
    lat: 40.7128,
    lng: -74.0060
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // API Functions
  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/listings/owner/${ownerId}`);
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Fetch listings error:', error);
      const mockListings = [
        {
          id: 1,
          title: 'Downtown Plaza Parking',
          address: '123 Main St, Downtown',
          pricePerHour: 15,
          totalSpots: 5,
          rating: 4.8,
          bookings: 24,
          revenue: 360,
          status: 'Active',
          imageUrl: 'https://images.pexels.com/photos/63294/autos-cars-car-lot-dealer-63294.jpeg?auto=compress&cs=tinysrgb&w=400',
          lat: 40.7128,
          lng: -74.0060,
          description: 'Secure parking in downtown area'
        },
        {
          id: 2,
          title: 'Central Mall Spot',
          address: '456 Oak Ave, Central',
          pricePerHour: 12,
          totalSpots: 3,
          rating: 4.6,
          bookings: 18,
          revenue: 216,
          status: 'Active',
          imageUrl: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=400',
          lat: 40.7589,
          lng: -73.9851,
          description: 'Convenient mall parking'
        }
      ];
      setListings(mockListings);
    } finally {
      setLoading(false);
    }
  };

  const createListing = async () => {
    if (!listingForm.title || !listingForm.address || !listingForm.pricePerHour) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...listingForm,
          ownerId,
          pricePerHour: parseFloat(listingForm.pricePerHour),
          totalSpots: parseInt(listingForm.totalSpots) || 1
        })
      });
      
      if (response.ok) {
        toast.success('Listing created successfully!');
        setShowAddListing(false);
        resetListingForm();
        fetchListings();
      }
    } catch (error) {
      console.error('Create listing error:', error);
      toast.error('Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateListing = async () => {
    if (!listingForm.title || !listingForm.address || !listingForm.pricePerHour) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/listings/${editingListing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...listingForm,
          pricePerHour: parseFloat(listingForm.pricePerHour),
          totalSpots: parseInt(listingForm.totalSpots) || 1
        })
      });
      
      if (response.ok) {
        toast.success('Listing updated successfully!');
        setEditingListing(null);
        resetListingForm();
        fetchListings();
      }
    } catch (error) {
      console.error('Update listing error:', error);
      toast.error('Failed to update listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteListing = async (listingId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/listings/${listingId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast.success('Listing deleted successfully');
        fetchListings();
      }
    } catch (error) {
      console.error('Delete listing error:', error);
      toast.error('Failed to delete listing');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/owner/${ownerId}`);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Fetch bookings error:', error);
      const mockBookings = [
        {
          id: 1,
          driverName: 'John Doe',
          driverEmail: 'john@example.com',
          driverPhone: '+1-555-0123',
          listingTitle: 'Downtown Plaza Parking',
          date: '2024-01-15',
          startTime: '09:00',
          endTime: '17:00',
          status: 'Active',
          price: 120,
          duration: 8
        },
        {
          id: 2,
          driverName: 'Jane Smith',
          driverEmail: 'jane@example.com',
          driverPhone: '+1-555-0124',
          listingTitle: 'Central Mall Spot',
          date: '2024-01-14',
          startTime: '14:00',
          endTime: '18:00',
          status: 'Completed',
          price: 48,
          duration: 4
        }
      ];
      setBookings(mockBookings);
    } finally {
      setLoading(false);
    }
  };

  const extendBooking = async (bookingId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/extend`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ additionalHours: 2 })
      });
      
      if (response.ok) {
        toast.success('Booking extended successfully');
        fetchBookings();
      }
    } catch (error) {
      console.error('Extend booking error:', error);
      toast.error('Failed to extend booking');
    } finally {
      setLoading(false);
    }
  };

  const fetchEarnings = async () => {
    setLoading(true);
    try {
      const [earningsResponse, payoutsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/earnings/owner/${ownerId}`),
        fetch(`${API_BASE_URL}/api/payouts/owner/${ownerId}`)
      ]);
      
      const earningsData = await earningsResponse.json();
      const payoutsData = await payoutsResponse.json();
      
      setEarnings(earningsData);
      setPayouts(payoutsData);
    } catch (error) {
      console.error('Fetch earnings error:', error);
      setEarnings({
        monthly: 1456,
        yearly: 12456,
        pending: 289
      });
      setPayouts([
        {
          id: 1,
          amount: 1200,
          date: '2024-01-15',
          status: 'Completed',
          method: 'Bank Transfer'
        },
        {
          id: 2,
          amount: 800,
          date: '2024-01-01',
          status: 'Completed',
          method: 'Bank Transfer'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const requestPayout = async () => {
    if (earnings.pending <= 0) {
      toast.error('No pending earnings to payout');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/payouts/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerId,
          amount: earnings.pending
        })
      });
      
      if (response.ok) {
        toast.success('Payout requested successfully');
        fetchEarnings();
      }
    } catch (error) {
      console.error('Request payout error:', error);
      toast.error('Failed to request payout');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [revenueResponse, occupancyResponse, viewsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/analytics/revenue?ownerId=${ownerId}`),
        fetch(`${API_BASE_URL}/api/analytics/occupancy?ownerId=${ownerId}`),
        fetch(`${API_BASE_URL}/api/analytics/listing-views?ownerId=${ownerId}`)
      ]);
      
      const revenueData = await revenueResponse.json();
      const occupancyData = await occupancyResponse.json();
      const viewsData = await viewsResponse.json();
      
      setAnalytics({
        revenue: revenueData,
        occupancy: occupancyData,
        listingViews: viewsData
      });
    } catch (error) {
      console.error('Fetch analytics error:', error);
      setAnalytics({
        revenue: [
          { month: 'Jan', revenue: 1200 },
          { month: 'Feb', revenue: 1400 },
          { month: 'Mar', revenue: 1100 },
          { month: 'Apr', revenue: 1600 },
          { month: 'May', revenue: 1800 },
          { month: 'Jun', revenue: 1500 }
        ],
        occupancy: [
          { month: 'Jan', rate: 75 },
          { month: 'Feb', rate: 82 },
          { month: 'Mar', rate: 68 },
          { month: 'Apr', rate: 85 },
          { month: 'May', rate: 90 },
          { month: 'Jun', rate: 78 }
        ],
        listingViews: [
          { name: 'Downtown Plaza', views: 245, value: 35 },
          { name: 'Central Mall', views: 180, value: 25 },
          { name: 'Business District', views: 165, value: 23 },
          { name: 'Others', views: 120, value: 17 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/owner/${ownerId}`);
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Fetch profile error:', error);
      setProfile({
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 987-6543',
        bankAccount: '****-****-****-1234'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!profile.name || !profile.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/owner/${ownerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      
      if (response.ok) {
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Save profile error:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const resetListingForm = () => {
    setListingForm({
      title: '',
      description: '',
      address: '',
      pricePerHour: '',
      totalSpots: '',
      imageUrl: '',
      lat: '',
      lng: ''
    });
  };

  const openEditModal = (listing) => {
    setEditingListing(listing);
    setListingForm({
      title: listing.title,
      description: listing.description || '',
      address: listing.address,
      pricePerHour: listing.pricePerHour.toString(),
      totalSpots: listing.totalSpots.toString(),
      imageUrl: listing.imageUrl || '',
      lat: listing.lat?.toString() || '',
      lng: listing.lng?.toString() || ''
    });
    setShowAddListing(true);
  };

  useEffect(() => {
    switch (activeTab) {
      case 'listings':
        fetchListings();
        break;
      case 'bookings':
        fetchBookings();
        break;
      case 'earnings':
        fetchEarnings();
        break;
      case 'analytics':
        fetchAnalytics();
        break;
      case 'profile':
        fetchProfile();
        break;
      default:
        break;
    }
  }, [activeTab]);

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
        {listings.map(listing => (
          <div key={listing.id} className="listing-card">
            <div className="listing-image">
              <img src={listing.imageUrl} alt={listing.title} />
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
                  <span className="value">${listing.pricePerHour}/hr</span>
                </div>
                <div className="stat">
                  <span className="label">Spots:</span>
                  <span className="value">{listing.totalSpots}</span>
                </div>
                <div className="stat">
                  <span className="label">Rating:</span>
                  <span className="value">
                    <Star size={14} fill="gold" />
                    {listing.rating}
                  </span>
                </div>
                <div className="stat">
                  <span className="label">Revenue:</span>
                  <span className="value">${listing.revenue}</span>
                </div>
              </div>
              <div className="listing-actions">
                <button className="btn-secondary" onClick={() => openEditModal(listing)}>
                  <Edit size={16} />
                  Edit
                </button>
                {listing.lat && listing.lng && (
                  <button className="btn-secondary" onClick={() => setSelectedListing(listing)}>
                    <Eye size={16} />
                    Map
                  </button>
                )}
                <button className="btn-danger" onClick={() => deleteListing(listing.id)}>
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Modal */}
      {selectedListing && selectedListing.lat && selectedListing.lng && (
        <div className="modal-overlay">
          <div className="modal map-modal">
            <div className="modal-header">
              <h3>{selectedListing.title}</h3>
              <button className="close-btn" onClick={() => setSelectedListing(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '400px' }}
                  center={{ lat: selectedListing.lat, lng: selectedListing.lng }}
                  zoom={15}
                >
                  <Marker
                    position={{ lat: selectedListing.lat, lng: selectedListing.lng }}
                  />
                  <InfoWindow
                    position={{ lat: selectedListing.lat, lng: selectedListing.lng }}
                  >
                    <div className="map-info-window">
                      <h4>{selectedListing.title}</h4>
                      <p>{selectedListing.address}</p>
                      <p className="price">${selectedListing.pricePerHour}/hr</p>
                    </div>
                  </InfoWindow>
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Listing Modal */}
      {showAddListing && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingListing ? 'Edit Listing' : 'Add New Listing'}</h3>
              <button 
                className="close-btn" 
                onClick={() => {
                  setShowAddListing(false);
                  setEditingListing(null);
                  resetListingForm();
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  value={listingForm.title}
                  onChange={(e) => setListingForm({ ...listingForm, title: e.target.value })}
                  placeholder="Enter listing title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  value={listingForm.address}
                  onChange={(e) => setListingForm({ ...listingForm, address: e.target.value })}
                  placeholder="Enter parking address"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pricePerHour">Price/Hour *</label>
                  <input
                    type="number"
                    id="pricePerHour"
                    value={listingForm.pricePerHour}
                    onChange={(e) => setListingForm({ ...listingForm, pricePerHour: e.target.value })}
                    placeholder="15"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="totalSpots">Total Spots</label>
                  <input
                    type="number"
                    id="totalSpots"
                    value={listingForm.totalSpots}
                    onChange={(e) => setListingForm({ ...listingForm, totalSpots: e.target.value })}
                    placeholder="1"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={listingForm.description}
                  onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
                  placeholder="Describe your parking space..."
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  type="url"
                  id="imageUrl"
                  value={listingForm.imageUrl}
                  onChange={(e) => setListingForm({ ...listingForm, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="lat">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    id="lat"
                    value={listingForm.lat}
                    onChange={(e) => setListingForm({ ...listingForm, lat: e.target.value })}
                    placeholder="40.7128"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lng">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    id="lng"
                    value={listingForm.lng}
                    onChange={(e) => setListingForm({ ...listingForm, lng: e.target.value })}
                    placeholder="-74.0060"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setShowAddListing(false);
                  setEditingListing(null);
                  resetListingForm();
                }}
              >
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={editingListing ? updateListing : createListing}
                disabled={loading}
              >
                {loading ? 'Saving...' : editingListing ? 'Update' : 'Create'}
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
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-info">
                <h4>{booking.driverName}</h4>
                <div className="booking-details-info">
                  <p><MapPin size={16} /> {booking.listingTitle}</p>
                  <p><Calendar size={16} /> {booking.date}</p>
                  <p><Clock size={16} /> {booking.startTime} - {booking.endTime} ({booking.duration}h)</p>
                  <p><MessageCircle size={16} /> {booking.driverEmail}</p>
                  <p><MessageCircle size={16} /> {booking.driverPhone}</p>
                </div>
              </div>
              <div className="booking-details">
                <div className={`status ${booking.status.toLowerCase()}`}>
                  {booking.status}
                </div>
                <div className="booking-price">${booking.price}</div>
              </div>
              <div className="booking-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => window.open(`mailto:${booking.driverEmail}`)}
                >
                  <MessageCircle size={16} />
                  Contact
                </button>
                {booking.status === 'Active' && (
                  <button 
                    className="btn-primary"
                    onClick={() => extendBooking(booking.id)}
                  >
                    <Clock size={16} />
                    Extend
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEarningsTab = () => (
    <div className="tab-content">
      <div className="earnings-section">
        <div className="earnings-header">
          <h2>Earnings Overview</h2>
          <button 
            className="btn-primary"
            onClick={requestPayout}
            disabled={earnings.pending <= 0 || loading}
          >
            <Download size={16} />
            Request Payout (${earnings.pending})
          </button>
        </div>
        
        <div className="earnings-stats">
          <div className="earning-card">
            <h3>This Month</h3>
            <div className="amount">${earnings.monthly}</div>
          </div>
          <div className="earning-card">
            <h3>This Year</h3>
            <div className="amount">${earnings.yearly}</div>
          </div>
          <div className="earning-card">
            <h3>Pending</h3>
            <div className="amount">${earnings.pending}</div>
          </div>
        </div>

        <div className="earnings-history">
          <h3>Payout History</h3>
          <div className="payment-list">
            {payouts.map(payout => (
              <div key={payout.id} className="payment-item">
                <div className="payment-details">
                  <span className="date">{payout.date}</span>
                  <span className="description">{payout.method}</span>
                </div>
                <div className="payment-status">
                  <div className="amount">${payout.amount}</div>
                  <div className={`status ${payout.status.toLowerCase()}`}>
                    {payout.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="tab-content">
      <div className="analytics-section">
        <h2>Performance Analytics</h2>
        
        <div className="analytics-charts">
          <div className="chart-section">
            <h3>Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-section">
            <h3>Occupancy Rate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.occupancy}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Occupancy Rate']} />
                <Legend />
                <Bar dataKey="rate" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-section">
            <h3>Listing Popularity</h3>
            <div className="pie-chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.listingViews}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.listingViews.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-legend">
                {analytics.listingViews.map((item, index) => (
                  <div key={item.name} className="legend-item">
                    <div 
                      className="legend-color" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{item.name}: {item.views} views</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
            <input 
              type="text" 
              id="fullName" 
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input 
              type="tel" 
              id="phone" 
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bankAccount">Bank Account</label>
            <input 
              type="text" 
              id="bankAccount" 
              value={profile.bankAccount}
              onChange={(e) => setProfile({ ...profile, bankAccount: e.target.value })}
            />
          </div>
          <button className="save-btn" onClick={saveProfile} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout userType="owner" activeTab={activeTab} setActiveTab={setActiveTab}>
      <Toaster position="top-right" />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Owner Dashboard</h1>
          <div className="user-info">
            <div className="user-avatar">
              <User size={24} />
            </div>
            <div className="user-details">
              <h3>{profile.name || 'Sarah Johnson'}</h3>
              <p>Space Owner</p>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
            onClick={() => setActiveTab('listings')}
          >
            <MapPin size={20} />
            My Listings
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
          {activeTab === 'listings' && renderListingsTab()}
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