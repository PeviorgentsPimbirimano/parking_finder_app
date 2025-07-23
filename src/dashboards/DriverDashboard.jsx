import React, { useState, useEffect } from 'react';
import { 
  Plus,
  Edit,
  Trash2,
  MapPin, 
  Clock, 
  Calendar, 
  CreditCard, 
  Star, 
  Search, 
  Filter,
  User,
  Car,
  Heart,
  X,
  Download,
  Phone,
  Mail
} from 'lucide-react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import toast, { Toaster } from 'react-hot-toast';
import DashboardLayout from './DashboardLayout';
import '../css/Dashboard.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.spoton-parking.com';
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY';

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [loading, setLoading] = useState(false);
  const [driverId] = useState(localStorage.getItem('driverId') || 'driver_123');

  // Search state
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');
  const [parkingSpots, setParkingSpots] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);

  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Payments state
  const [payments, setPayments] = useState([]);

  // Vehicles state
  const [vehicles, setVehicles] = useState([]);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  // Profile state
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Form states
  const [bookingDetails, setBookingDetails] = useState({
    startTime: '',
    endTime: '',
    duration: 1
  });

  const [vehicleForm, setVehicleForm] = useState({
    licensePlate: '',
    make: '',
    model: '',
    color: ''
  });

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const defaultCenter = {
    lat: 40.7128,
    lng: -74.0060
  };

  // API Functions
  const searchParkingSpots = async () => {
    if (!searchLocation.trim()) {
      toast.error('Please enter a location');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/spots?location=${encodeURIComponent(searchLocation)}&date=${searchDate}&time=${searchTime}`);
      const data = await response.json();
      setParkingSpots(data);
      toast.success(`Found ${data.length} parking spots`);
    } catch (error) {
      console.error('Search error:', error);
      const mockSpots = [
        {
          id: 1,
          name: 'Downtown Plaza Parking',
          address: '123 Main St, Downtown',
          price: 15,
          rating: 4.8,
          distance: '0.3 miles',
          image: 'https://images.pexels.com/photos/63294/autos-cars-car-lot-dealer-63294.jpeg?auto=compress&cs=tinysrgb&w=400',
          available: true,
          features: ['Covered', 'Security Camera', '24/7 Access'],
          lat: 40.7128,
          lng: -74.0060
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
          features: ['Ground Level', 'Well Lit', 'Easy Access'],
          lat: 40.7589,
          lng: -73.9851
        }
      ];
      setParkingSpots(mockSpots);
      toast.success(`Found ${mockSpots.length} parking spots`);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async () => {
    if (!selectedSpot || !bookingDetails.startTime || !bookingDetails.endTime) {
      toast.error('Please fill in all booking details');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driverId,
          spotId: selectedSpot.id,
          startTime: bookingDetails.startTime,
          endTime: bookingDetails.endTime,
          duration: bookingDetails.duration
        })
      });
      
      if (response.ok) {
        toast.success('Booking created successfully!');
        setShowBookingModal(false);
        setSelectedSpot(null);
        setBookingDetails({ startTime: '', endTime: '', duration: 1 });
        fetchBookings();
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/driver/${driverId}`);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Fetch bookings error:', error);
      const mockBookings = [
        {
          id: 1,
          location: 'Downtown Plaza Parking',
          date: '2024-01-15',
          time: '09:00 AM - 05:00 PM',
          status: 'Active',
          price: 15,
          lat: 40.7128,
          lng: -74.0060
        },
        {
          id: 2,
          location: 'Central Mall Spot',
          date: '2024-01-12',
          time: '02:00 PM - 06:00 PM',
          status: 'Completed',
          price: 12
        }
      ];
      setBookings(mockBookings);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast.success('Booking cancelled successfully');
        fetchBookings();
      }
    } catch (error) {
      console.error('Cancel booking error:', error);
      toast.error('Failed to cancel booking');
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/driver/${driverId}`);
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Fetch payments error:', error);
      const mockPayments = [
        {
          id: 1,
          location: 'Downtown Plaza Parking',
          amount: 15.00,
          date: 'January 15, 2024',
          method: 'Credit Card ****1234',
          status: 'Successful'
        },
        {
          id: 2,
          location: 'Central Mall Spot',
          amount: 12.00,
          date: 'January 12, 2024',
          method: 'EcoCash',
          status: 'Successful'
        }
      ];
      setPayments(mockPayments);
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = async (paymentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/${paymentId}/receipt`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `receipt-${paymentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Receipt downloaded successfully');
    } catch (error) {
      console.error('Download receipt error:', error);
      toast.error('Failed to download receipt');
    }
  };

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/vehicles/driver/${driverId}`);
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Fetch vehicles error:', error);
      const mockVehicles = [
        {
          id: 1,
          licensePlate: 'ABC-123',
          make: 'Toyota',
          model: 'Camry',
          color: 'Silver'
        },
        {
          id: 2,
          licensePlate: 'XYZ-789',
          make: 'Honda',
          model: 'Civic',
          color: 'Blue'
        }
      ];
      setVehicles(mockVehicles);
    } finally {
      setLoading(false);
    }
  };

  const saveVehicle = async () => {
    if (!vehicleForm.licensePlate || !vehicleForm.make || !vehicleForm.model) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const url = editingVehicle 
        ? `${API_BASE_URL}/api/vehicles/${editingVehicle.id}`
        : `${API_BASE_URL}/api/vehicles`;
      
      const response = await fetch(url, {
        method: editingVehicle ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...vehicleForm,
          driverId: editingVehicle ? undefined : driverId
        })
      });
      
      if (response.ok) {
        toast.success(editingVehicle ? 'Vehicle updated successfully' : 'Vehicle added successfully');
        setShowVehicleModal(false);
        setEditingVehicle(null);
        setVehicleForm({ licensePlate: '', make: '', model: '', color: '' });
        fetchVehicles();
      }
    } catch (error) {
      console.error('Save vehicle error:', error);
      toast.error('Failed to save vehicle');
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (vehicleId) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/vehicles/${vehicleId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast.success('Vehicle deleted successfully');
        fetchVehicles();
      }
    } catch (error) {
      console.error('Delete vehicle error:', error);
      toast.error('Failed to delete vehicle');
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${driverId}`);
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Fetch profile error:', error);
      setProfile({
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567'
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
      const response = await fetch(`${API_BASE_URL}/api/users/${driverId}`, {
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

  useEffect(() => {
    switch (activeTab) {
      case 'bookings':
        fetchBookings();
        break;
      case 'payments':
        fetchPayments();
        break;
      case 'vehicles':
        fetchVehicles();
        break;
      case 'profile':
        fetchProfile();
        break;
      default:
        break;
    }
  }, [activeTab]);

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
          <button className="search-btn" onClick={searchParkingSpots} disabled={loading}>
            <Search size={20} />
            {loading ? 'Searching...' : 'Search Parking Spots'}
          </button>
        </div>
      </div>

      {parkingSpots.length > 0 && (
        <div className="search-results">
          <div className="results-header">
            <h3>Available Parking Spots</h3>
            <button className="filter-btn">
              <Filter size={20} />
              Filter
            </button>
          </div>
          <div className="parking-spots">
            {parkingSpots.map(spot => (
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
                      onClick={() => {
                        setSelectedSpot(spot);
                        setShowBookingModal(true);
                      }}
                    >
                      {spot.available ? 'Book Now' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedSpot && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Book Parking Spot</h3>
              <button className="close-btn" onClick={() => setShowBookingModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="booking-spot-info">
                <h4>{selectedSpot.name}</h4>
                <p>{selectedSpot.address}</p>
                <p className="price">${selectedSpot.price}/day</p>
              </div>
              <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input
                  type="datetime-local"
                  id="startTime"
                  value={bookingDetails.startTime}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, startTime: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <input
                  type="datetime-local"
                  id="endTime"
                  value={bookingDetails.endTime}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, endTime: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowBookingModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={createBooking} disabled={loading}>
                {loading ? 'Booking...' : 'Confirm Booking'}
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
        <h2>My Bookings</h2>
        <div className="bookings-list">
          {bookings.map(booking => (
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
                    <button className="btn-danger" onClick={() => cancelBooking(booking.id)}>
                      Cancel
                    </button>
                  </>
                )}
                {booking.status === 'Completed' && (
                  <button className="btn-primary">Book Again</button>
                )}
                {booking.lat && booking.lng && (
                  <button 
                    className="btn-primary" 
                    onClick={() => setSelectedBooking(booking)}
                  >
                    View Map
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Modal */}
      {selectedBooking && selectedBooking.lat && selectedBooking.lng && (
        <div className="modal-overlay">
          <div className="modal map-modal">
            <div className="modal-header">
              <h3>Booking Location</h3>
              <button className="close-btn" onClick={() => setSelectedBooking(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{ lat: selectedBooking.lat, lng: selectedBooking.lng }}
                  zoom={15}
                >
                  <Marker
                    position={{ lat: selectedBooking.lat, lng: selectedBooking.lng }}
                  />
                  <InfoWindow
                    position={{ lat: selectedBooking.lat, lng: selectedBooking.lng }}
                  >
                    <div className="map-info-window">
                      <h4>{selectedBooking.location}</h4>
                      <p>{selectedBooking.date}</p>
                      <p>{selectedBooking.time}</p>
                      <p className="price">${selectedBooking.price}</p>
                    </div>
                  </InfoWindow>
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPaymentsTab = () => (
    <div className="tab-content">
      <div className="payments-section">
        <h2>Payment History</h2>
        <div className="payments-list">
          {payments.map(payment => (
            <div key={payment.id} className="payment-card">
              <div className="payment-info">
                <h4>{payment.location}</h4>
                <p className="payment-date">{payment.date}</p>
                <p className="payment-method">{payment.method}</p>
              </div>
              <div className="payment-details">
                <div className="payment-amount">${payment.amount.toFixed(2)}</div>
                <div className={`status ${payment.status.toLowerCase()}`}>
                  {payment.status}
                </div>
              </div>
              <div className="payment-actions">
                <button 
                  className="btn-primary"
                  onClick={() => downloadReceipt(payment.id)}
                >
                  <Download size={16} />
                  Receipt
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVehiclesTab = () => (
    <div className="tab-content">
      <div className="vehicles-section">
        <div className="vehicles-header">
          <h2>My Vehicles</h2>
          <button 
            className="add-vehicle-btn"
            onClick={() => setShowVehicleModal(true)}
          >
            <Plus size={20} />
            Add Vehicle
          </button>
        </div>
        <div className="vehicles-list">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="vehicle-card">
              <div className="vehicle-info">
                <h4>{vehicle.make} {vehicle.model}</h4>
                <p className="plate-number">{vehicle.licensePlate}</p>
                <p className="vehicle-color">{vehicle.color}</p>
              </div>
              <div className="vehicle-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    setEditingVehicle(vehicle);
                    setVehicleForm(vehicle);
                    setShowVehicleModal(true);
                  }}
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button 
                  className="btn-danger"
                  onClick={() => deleteVehicle(vehicle.id)}
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle Modal */}
      {showVehicleModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}</h3>
              <button 
                className="close-btn" 
                onClick={() => {
                  setShowVehicleModal(false);
                  setEditingVehicle(null);
                  setVehicleForm({ licensePlate: '', make: '', model: '', color: '' });
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="licensePlate">License Plate *</label>
                <input
                  type="text"
                  id="licensePlate"
                  value={vehicleForm.licensePlate}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, licensePlate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="make">Make *</label>
                <input
                  type="text"
                  id="make"
                  value={vehicleForm.make}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, make: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="model">Model *</label>
                <input
                  type="text"
                  id="model"
                  value={vehicleForm.model}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="color">Color</label>
                <input
                  type="text"
                  id="color"
                  value={vehicleForm.color}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, color: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setShowVehicleModal(false);
                  setEditingVehicle(null);
                  setVehicleForm({ licensePlate: '', make: '', model: '', color: '' });
                }}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={saveVehicle} disabled={loading}>
                {loading ? 'Saving...' : editingVehicle ? 'Update' : 'Add Vehicle'}
              </button>
            </div>
          </div>
        </div>
      )}
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
          <button className="save-btn" onClick={saveProfile} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout userType="driver" activeTab={activeTab} setActiveTab={setActiveTab}>
      <Toaster position="top-right" />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Driver Dashboard</h1>
          <div className="user-info">
            <div className="user-avatar">
              <User size={24} />
            </div>
            <div className="user-details">
              <h3>{profile.name || 'John Doe'}</h3>
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
            Find Parking
          </button>
          <button 
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <Calendar size={20} />
            My Bookings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <CreditCard size={20} />
            Payments
          </button>
          <button 
            className={`tab-btn ${activeTab === 'vehicles' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehicles')}
          >
            <Car size={20} />
            My Vehicles
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
          {activeTab === 'payments' && renderPaymentsTab()}
          {activeTab === 'vehicles' && renderVehiclesTab()}
          {activeTab === 'profile' && renderProfileTab()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DriverDashboard;