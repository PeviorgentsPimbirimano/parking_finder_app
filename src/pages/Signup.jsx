import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import '../css/Signup.css';

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    role: "driver",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setForm({ ...form, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store user session
    localStorage.setItem('userSession', JSON.stringify({
      username: form.email,
      role: form.role,
      name: form.username,
      loginTime: new Date().toISOString()
    }));

    // Show success message
    alert(`Welcome ${form.username}! Your ${form.role === "owner" ? "Space Owner" : "Driver"} account has been created successfully!`);

    // Redirect based on role
    if (form.role === 'driver') {
      navigate('/dashboard/driver');
    } else if (form.role === 'owner') {
      navigate('/dashboard/owner');
    }

    setIsLoading(false);
  };

  const handleGoogleSignup = () => {
    alert("Google Sign Up coming soon!");
  };

  return (
    <>
      <header id="header">
        <div className="links">
          <div className="logo">
            <h1>
              Spot <span>On</span>
            </h1>
          </div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/owner">Rent out your space</Link>
            <Link to="/help">Help</Link>
            <Link to="/login">
              <span>Login</span>
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <section className="signup-section">
          <div className="signup-box">
            <h2>Create Your SpotOn Account</h2>

            <button
              className="google-btn"
              type="button"
              onClick={handleGoogleSignup}
            >
              <img
                src="src/assets/Google-icon.jpeg"
                alt="Google icon"
                className="google-icon"
              />
              Sign up with Google
            </button>
            <div className="or-divider">
              <span>or</span>
            </div>

            {/* Role selection */}
            <div className="role-select">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="driver"
                  checked={form.role === "driver"}
                  onChange={handleRoleChange}
                />
                Driver
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="owner"
                  checked={form.role === "owner"}
                  onChange={handleRoleChange}
                />
                Space Owner
              </label>
            </div>

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="signup-username">
                  <i className="fa-solid fa-user"></i> Full Name
                </label>
                <input
                  type="text"
                  id="signup-username"
                  name="username"
                  required
                  autoComplete="name"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-email">
                  <i className="fa-solid fa-envelope"></i> Email
                </label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-password">
                  <i className="fa-solid fa-lock"></i> Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  required
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password (min 6 characters)"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-confirm">
                  <i className="fa-solid fa-lock"></i> Confirm Password
                </label>
                <input
                  type="password"
                  id="signup-confirm"
                  name="confirm"
                  required
                  autoComplete="new-password"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
              </div>
              <button type="submit" className="btn2" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
            <p className="signup-links">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}