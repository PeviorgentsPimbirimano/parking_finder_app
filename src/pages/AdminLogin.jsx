import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';
import '../css/AdminLogin.css';

const AdminLogin = () => {
  const [form, setForm] = useState({
    adminId: '',
    password: '',
    securityCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Demo admin credentials
  const ADMIN_CREDENTIALS = {
    adminId: 'admin@spoton.com',
    password: 'Admin123!',
    securityCode: '2024'
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validate credentials
    if (
      form.adminId === ADMIN_CREDENTIALS.adminId &&
      form.password === ADMIN_CREDENTIALS.password &&
      form.securityCode === ADMIN_CREDENTIALS.securityCode
    ) {
      // Store admin session (in a real app, this would be a secure token)
      localStorage.setItem('adminSession', JSON.stringify({
        adminId: form.adminId,
        loginTime: new Date().toISOString(),
        role: 'admin'
      }));
      
      // Redirect to admin dashboard
      navigate('/dashboard/admin');
    } else {
      setError('Invalid credentials. Please check your Admin ID, password, and security code.');
    }

    setIsLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <div className="admin-logo">
            <Shield size={48} />
          </div>
          <h1>SpotOn Admin Portal</h1>
          <p>Secure administrator access</p>
        </div>

        <div className="admin-login-card">
          <form onSubmit={handleSubmit} className="admin-login-form">
            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="adminId">
                <Shield size={16} />
                Admin ID
              </label>
              <input
                type="email"
                id="adminId"
                name="adminId"
                required
                placeholder="Enter your admin email"
                value={form.adminId}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <Shield size={16} />
                Password
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="securityCode">
                <Shield size={16} />
                Security Code
              </label>
              <input
                type="text"
                id="securityCode"
                name="securityCode"
                required
                placeholder="Enter security code"
                value={form.securityCode}
                onChange={handleChange}
                disabled={isLoading}
                maxLength={6}
              />
            </div>

            <button 
              type="submit" 
              className="admin-login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield size={16} />
                  Access Admin Dashboard
                </>
              )}
            </button>
          </form>

          <div className="demo-credentials">
            <h4>Demo Credentials:</h4>
            <div className="credential-item">
              <strong>Admin ID:</strong> admin@spoton.com
            </div>
            <div className="credential-item">
              <strong>Password:</strong> Admin123!
            </div>
            <div className="credential-item">
              <strong>Security Code:</strong> 2024
            </div>
          </div>

          <div className="admin-login-footer">
            <Link to="/" className="back-to-home">
              ← Back to SpotOn Home
            </Link>
          </div>
        </div>

        <div className="security-notice">
          <AlertCircle size={16} />
          <span>This is a secure admin portal. All access attempts are logged and monitored.</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;