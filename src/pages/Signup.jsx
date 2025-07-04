import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }
    alert("Thank you for signing up! (Demo: No real registration)");
    setForm({
      username: "",
      email: "",
      password: "",
      confirm: "",
    });
  };

  const handleGoogleSignup = () => {
    alert("Google Sign Up coming soon!");
  };

  return (
    <>
    <header id="header">
        <div class="links">
            <div class="logo">
                <h1>Spot <span>On</span></h1>
            </div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/About">About Us</Link>
                <Link to="/Owner">Rent out your space</Link>
                <Link to="/Help">Help</Link>
                <Link to="/Login"><span>Login</span></Link>
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
                src="/images/google-icon.svg"
                alt="Google icon"
                className="google-icon"
              />
              Sign up with Google
            </button>
            <div className="or-divider">
              <span>or</span>
            </div>

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="signup-username">
                  <i className="fa-solid fa-user"></i> Username
                </label>
                <input
                  type="text"
                  id="signup-username"
                  name="username"
                  required
                  autoComplete="username"
                  value={form.username}
                  onChange={handleChange}
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
                />
              </div>
              <button type="submit" className="btn2">
                Sign Up
              </button>
            </form>
            <p className="signup-links">
              Already have an account? <Link to="/Login">Sign in</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}