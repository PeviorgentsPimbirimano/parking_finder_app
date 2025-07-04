import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../css/Owner.css";

export default function Owner() {
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
                <Link to="/Help">Help</Link>
                <Link to="/Login"><span>Login</span></Link>
                <button class="btn"><Link to="/Signup"><span>Sign Up</span></Link></button>
            </nav>
        </div>
    </header>
      <main>
        <section className="owner-hero">
          <div className="owner-hero-content">
            <h2>
              Earn Extra Income<br />Rent Out Your Parking Space
            </h2>
            <p>
              Turn your unused parking spot into profit! Join SpotOn and help drivers find the perfect parking—while you earn, effortlessly.
            </p>
          </div>
        </section>
        <section className="owner-benefits">
          <h3>Why List Your Space on SpotOn?</h3>
          <div className="benefit-list">
            <div>
              <i className="fa-solid fa-coins"></i>
              <h4>Easy Earnings</h4>
              <p>List your space in minutes and start earning passive income every month.</p>
            </div>
            <div>
              <i className="fa-solid fa-calendar-check"></i>
              <h4>Flexible Availability</h4>
              <p>Set your schedule and control when your spot is available for rent.</p>
            </div>
            <div>
              <i className="fa-solid fa-shield"></i>
              <h4>Secure Payments</h4>
              <p>All transactions are secure and managed through SpotOn—no hassle, no worries.</p>
            </div>
          </div>
        </section>
        <section className="owner-form-section">
          <h3>List Your Space</h3>
          <form className="owner-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="ownerName">Full Name</label>
                <input type="text" id="ownerName" name="ownerName" required />
              </div>
              <div className="form-group">
                <label htmlFor="ownerEmail">Email Address</label>
                <input type="email" id="ownerEmail" name="ownerEmail" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">Parking Space Address</label>
                <input type="text" id="address" name="address" required />
              </div>
              <div className="form-group">
                <label htmlFor="availability">Availability</label>
                <select id="availability" name="availability" required>
                  <option value="">Select</option>
                  <option value="24/7">24/7</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price per Day ($)</label>
                <input type="number" id="price" name="price" min="0" required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows="2" placeholder="Describe your parking space"></textarea>
              </div>
            </div>
            <button type="submit" className="btn2">Submit Listing</button>
          </form>
        </section>
        <section className="owner-cta">
          <h3>Questions?</h3>
          <p>
            Contact our team at <a href="mailto:peviorgentspimbirimano@gmail.com">peviorgentspimbirimano@gmail.com</a> or visit our <Link to="/help">Help</Link> section.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}