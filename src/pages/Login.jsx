import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import '../css/Login.css';
import { supabase } from "../supabaseClient";

const DEMO_USERS = {
  "driver@test.com": {
    password: "driver123",
    role: "driver",
    name: "Demo Driver"
  },
  "owner@test.com": {
    password: "owner123",
    role: "owner",
    name: "Demo Owner"
  }
};

export default function Login() {
  // FIX: use 'email' for state and logic
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) alert(error.message);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check demo users first
    const demoUser = DEMO_USERS[form.email];
    if (demoUser && demoUser.password === form.password) {
      localStorage.setItem('userSession', JSON.stringify({
        username: form.email,
        role: demoUser.role,
        name: demoUser.name,
        loginTime: new Date().toISOString()
      }));
      if (demoUser.role === 'driver') {
        navigate('/dashboard/driver');
      } else if (demoUser.role === 'owner') {
        navigate('/dashboard/owner');
      }
      setIsLoading(false);
      return;
    }

    // Supabase login
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error.message || "Invalid login credentials");
      setIsLoading(false);
      return;
    }

    alert("Login successful!");
    localStorage.setItem('userSession', JSON.stringify({
      username: form.email,
      role: "driver", // Fetch actual role if needed
      name: data?.user?.user_metadata?.name || form.email,
      loginTime: new Date().toISOString()
    }));

    navigate('/dashboard/driver');
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
                disabled={isLoading}
              >
                <img
                  src="src/assets/Google-icon.jpeg"
                  alt="Google icon"
                  className="google-icon"
                />
                Sign In with Google
              </button>
              <div className="or-divider">
                <span>or</span>
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="fa-solid fa-user"></i> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="username"
                  value={form.email}
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
                {isLoading ? "Loading..." : "Login"}
              </button>
            </form>
            <div style={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              fontSize: '14px',
              textAlign: 'left'
            }}>
              <strong>Demo Credentials:</strong><br />
              <strong>Driver:</strong> driver@test.com / driver123<br />
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