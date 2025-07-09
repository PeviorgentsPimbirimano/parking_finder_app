import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import '../css/Login.css';

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Demo credentials for testing
  const DEMO_USERS = {
    'driver@test.com': { password: 'driver123', role: 'driver', name: 'John Doe' },
    'owner@test.com': { password: 'owner123', role: 'owner', name: 'Sarah Johnson' }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleGoogleSignup = () => {
    alert("Google Sign Up coming soon!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user exists in demo users
    const user = DEMO_USERS[form.username];
    
    if (user && user.password === form.password) {
      // Store user session
      localStorage.setItem('userSession', JSON.stringify({
        username: form.username,
        role: user.role,
        name: user.name,
        loginTime: new Date().toISOString()
      }));

      // Redirect based on role
      if (user.role === 'driver') {
        navigate('/dashboard/driver');
      } else if (user.role === 'owner') {
        navigate('/dashboard/owner');
      }
    } else {
      alert('Invalid credentials. Try:\nDriver: driver@test.com / driver123\nOwner: owner@test.com / owner123');
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <header id="header">
        <div className="links">
          <div className="logo">
            <h1>Spot <span>On</span></h1>
          </div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/owner">Rent out your space</Link>
            <Link to="/help">Help</Link>
            <button className="btn">
              <Link to="/signup"><span>Sign Up</span></Link>
            </button>
          </nav>
        </div>
      </header>
      <main>
        <section className="login-section">
          <div className="login-box">
            <h2>Welcome Back!</h2>
            <form className="login-form" onSubmit={handleSubmit}>
            <button
              className="google-btn"
              type="button"
              onClick={handleGoogleSignup}
            >
              <img
                src="src\assets\Google-icon.jpeg"
                alt="Google icon"
                className="google-icon"
              />
              Sign In with Google
            </button>
              <div className="or-divider">
                <span>or</span>
              </div>
              <div className="form-group">
                <label htmlFor="username">
                  <i className="fa-solid fa-user"></i> Email
                </label>
                <input
                  type="email"
                  id="username"
                  name="username"
                  required
                  autoComplete="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="fa-solid fa-lock"></i> Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>
              <button type="submit" className="btn2" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            {/* Demo credentials info */}
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              fontSize: '14px',
              textAlign: 'left'
            }}>
              <strong>Demo Credentials:</strong><br/>
              <strong>Driver:</strong> driver@test.com / driver123<br/>
              <strong>Owner:</strong> owner@test.com / owner123
            </div>
            
            <p className="login-links">
              <a href="#">Forgot Password?</a> |{" "}
              <Link to="/signup">Create Account</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}