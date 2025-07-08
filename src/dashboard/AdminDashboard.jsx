import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Settings,
  Eye,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  Calendar,
  Mail,
  Phone,
  Shield
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      type: 'Driver',
      status: 'Active',
      joinDate: '2024-01-10',
      totalBookings: 12,
      totalSpent: 180
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      type: 'Owner',
      status: 'Active',
      joinDate: '2024-01-05',
      totalListings: 3,
      totalEarnings: 1196
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      type: 'Driver',
      status: 'Suspended',
      joinDate: '2024-01-15',
      totalBookings: 5,
      totalSpent: 75
    }
  ];

  const mockListings = [
    {
      id: 1,
      title: 'Downtown Plaza Parking',
      owner: 'Sarah Johnson',
      address: '123 Main St, Downtown',
      price: 15,
      status: 'Active',
      bookings: 24,
      revenue: 360,
      reported: 0
    },
    {
      id: 2,
      title: 'Central Mall Spot',
      owner: 'Tom Brown',
      address: '456 Oak Ave, Central',
      price: 12,
      status: 'Pending',
      bookings: 0,
      revenue: 0,
      reported: 1
    },
    {
      id: 3,
      title: 'Business District Garage',
      owner: 'Lisa Davis',
      address: '789 Pine St, Business District',
      price: 20,
      status: 'Active',
      bookings: 31,
      revenue: 620,
      reported: 0
    }
  ];

  const mockReports = [
    {
      id: 1,
      type: 'Listing Issue',
      reporter: 'John Doe',
      subject: 'Downtown Plaza Parking',
      description: 'Parking space was not available as advertised',
      date: '2024-01-14',
      status: 'Open',
      priority: 'High'
    },
    {
      id: 2,
      type: 'User Complaint',
      reporter: 'Jane Smith',
      subject: 'Mike Wilson',
      description: 'User was rude and blocked my car',
      date: '2024-01-13',
      status: 'In Progress',
      priority: 'Medium'
    },
    {
      id: 3,
      type: 'Payment Issue',
      reporter: 'Sarah Johnson',
      subject: 'Missing Payment',
      description: 'Payment for booking #12345 was not received',
      date: '2024-01-12',
      status: 'Resolved',
      priority: 'High'
    }
  ];

  const renderOverviewTab = () => (
    <div className="tab-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>2,459</h3>
            <p>Total Users</p>
            <span className="stat-change positive">+12% this month</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <MapPin size={24} />
          </div>
          <div className="stat-info">
            <h3>1,847</h3>
            <p>Active Listings</p>
            <span className="stat-change positive">+8% this month</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h3>$45,678</h3>
            <p>Total Revenue</p>
            <span className="stat-change positive">+15% this month</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-info">
            <h3>23</h3>
            <p>Open Reports</p>
            <span className="stat-change negative">+3 this week</span>
          </div>
        </div>
      </div>

      <div className="overview-charts">
        <div className="chart-section">
          <h3>User Growth</h3>
          <div className="chart-placeholder">
            <BarChart3 size={48} />
            <p>User growth chart would go here</p>
          </div>
        </div>
        <div className="chart-section">
          <h3>Revenue Analytics</h3>
          <div className="chart-placeholder">
            <PieChart size={48} />
            <p>Revenue breakdown would go here</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn">
            <Users size={20} />
            Manage Users
          </button>
          <button className="action-btn">
            <MapPin size={20} />
            Review Listings
          </button>
          <button className="action-btn">
            <AlertTriangle size={20} />
            Handle Reports
          </button>
          <button className="action-btn">
            <Settings size={20} />
            System Settings
          </button>
        </div>
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div className="tab-content">
      <div className="users-header">
        <h2>User Management</h2>
        <div className="users-filters">
          <select className="filter-select">
            <option>All Users</option>
            <option>Drivers</option>
            <option>Owners</option>
          </select>
          <select className="filter-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Activity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      <Users size={20} />
                    </div>
                    <div>
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`user-type ${user.type.toLowerCase()}`}>
                    {user.type}
                  </span>
                </td>
                <td>
                  <span className={`status ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  {user.type === 'Driver' ? (
                    <div>
                      <div>{user.totalBookings} bookings</div>
                      <div>${user.totalSpent} spent</div>
                    </div>
                  ) : (
                    <div>
                      <div>{user.totalListings} listings</div>
                      <div>${user.totalEarnings} earned</div>
                    </div>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon">
                      <Eye size={16} />
                    </button>
                    <button className="btn-icon">
                      <Edit size={16} />
                    </button>
                    <button className="btn-icon">
                      <Ban size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderListingsTab = () => (
    <div className="tab-content">
      <div className="listings-header">
        <h2>Listing Management</h2>
        <div className="listings-filters">
          <select className="filter-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Suspended</option>
          </select>
          <select className="filter-select">
            <option>All Locations</option>
            <option>Downtown</option>
            <option>Central</option>
            <option>Business District</option>
          </select>
        </div>
      </div>

      <div className="listings-table">
        <table>
          <thead>
            <tr>
              <th>Listing</th>
              <th>Owner</th>
              <th>Price</th>
              <th>Status</th>
              <th>Performance</th>
              <th>Reports</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockListings.map(listing => (
              <tr key={listing.id}>
                <td>
                  <div className="listing-info">
                    <div>
                      <div className="listing-title">{listing.title}</div>
                      <div className="listing-address">{listing.address}</div>
                    </div>
                  </div>
                </td>
                <td>{listing.owner}</td>
                <td>${listing.price}/day</td>
                <td>
                  <span className={`status ${listing.status.toLowerCase()}`}>
                    {listing.status}
                  </span>
                </td>
                <td>
                  <div>
                    <div>{listing.bookings} bookings</div>
                    <div>${listing.revenue} revenue</div>
                  </div>
                </td>
                <td>
                  <span className={`report-count ${listing.reported > 0 ? 'has-reports' : ''}`}>
                    {listing.reported} reports
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon">
                      <Eye size={16} />
                    </button>
                    <button className="btn-icon">
                      <Edit size={16} />
                    </button>
                    {listing.status === 'Pending' && (
                      <>
                        <button className="btn-icon success">
                          <CheckCircle size={16} />
                        </button>
                        <button className="btn-icon danger">
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="tab-content">
      <div className="reports-header">
        <h2>Reports & Issues</h2>
        <div className="reports-filters">
          <select className="filter-select">
            <option>All Types</option>
            <option>Listing Issue</option>
            <option>User Complaint</option>
            <option>Payment Issue</option>
          </select>
          <select className="filter-select">
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      <div className="reports-list">
        {mockReports.map(report => (
          <div key={report.id} className="report-card">
            <div className="report-header">
              <div className="report-type">{report.type}</div>
              <div className={`priority ${report.priority.toLowerCase()}`}>
                {report.priority} Priority
              </div>
            </div>
            <div className="report-content">
              <h4>{report.subject}</h4>
              <p className="report-description">{report.description}</p>
              <div className="report-meta">
                <span>Reported by: {report.reporter}</span>
                <span>Date: {report.date}</span>
              </div>
            </div>
            <div className="report-footer">
              <div className={`status ${report.status.toLowerCase().replace(' ', '-')}`}>
                {report.status}
              </div>
              <div className="report-actions">
                <button className="btn-secondary">View Details</button>
                <button className="btn-primary">Take Action</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="tab-content">
      <div className="settings-section">
        <h2>System Settings</h2>
        <div className="settings-grid">
          <div className="setting-group">
            <h3>Platform Settings</h3>
            <div className="setting-item">
              <label>Commission Rate (%)</label>
              <input type="number" defaultValue="10" min="0" max="100" />
            </div>
            <div className="setting-item">
              <label>Minimum Booking Duration (hours)</label>
              <input type="number" defaultValue="1" min="1" max="24" />
            </div>
            <div className="setting-item">
              <label>Auto-approve Listings</label>
              <select>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
          
          <div className="setting-group">
            <h3>Payment Settings</h3>
            <div className="setting-item">
              <label>Payment Processing Fee (%)</label>
              <input type="number" defaultValue="2.9" min="0" max="10" step="0.1" />
            </div>
            <div className="setting-item">
              <label>Payout Schedule</label>
              <select>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>

          <div className="setting-group">
            <h3>Notification Settings</h3>
            <div className="setting-item">
              <label>Email Notifications</label>
              <select>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
            <div className="setting-item">
              <label>SMS Notifications</label>
              <select>
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </div>
        <button className="save-btn">Save Settings</button>
      </div>
    </div>
  );

  return (
    <DashboardLayout userType="admin">
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <div className="user-avatar">
              <Shield size={24} />
            </div>
            <div className="user-details">
              <h3>Admin User</h3>
              <p>System Administrator</p>
            </div>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 size={20} />
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} />
            Users
          </button>
          <button 
            className={`tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
            onClick={() => setActiveTab('listings')}
          >
            <MapPin size={20} />
            Listings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <AlertTriangle size={20} />
            Reports
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            Settings
          </button>
        </div>

        <div className="dashboard-content">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'users' && renderUsersTab()}
          {activeTab === 'listings' && renderListingsTab()}
          {activeTab === 'reports' && renderReportsTab()}
          {activeTab === 'settings' && renderSettingsTab()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;