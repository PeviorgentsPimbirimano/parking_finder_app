import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/Login.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login functionality is not implemented yet.");
    setForm({ username: "", password: "" });
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
                <button class="btn"><Link to="/Signup"><span>Sign Up</span></Link></button>
            </nav>
        </div>
    </header>
      <main>
        <section className="login-section">
          <div className="login-box">
            <h2>Welcome Back!</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">
                  <i className="fa-solid fa-user"></i> Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  autoComplete="username"
                  value={form.username}
                  onChange={handleChange}
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
                />
              </div>
              <button type="submit" className="btn2">
                Sign In
              </button>
            </form>
            <p className="login-links">
              <a href="#">Forgot Password?</a> |{" "}
              <Link to="/Signup">Create Account</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}