import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section id="newsletter">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h4>Stay Updated with SpotOn</h4>
          <p>Get the latest parking deals, new locations, and exclusive offers delivered to your inbox</p>
          
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn2">
                  Subscribe
                </button>
              </div>
              <p className="newsletter-note">
                <i className="fa-solid fa-shield-alt"></i>
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            <div className="subscription-success">
              <i className="fa-solid fa-check-circle"></i>
              <h5>Thank you for subscribing!</h5>
              <p>You'll receive our latest updates and offers soon.</p>
            </div>
          )}
        </div>
        
        <div className="newsletter-benefits">
          <div className="benefit-item">
            <i className="fa-solid fa-percent"></i>
            <span>Exclusive Discounts</span>
          </div>
          <div className="benefit-item">
            <i className="fa-solid fa-map-pin"></i>
            <span>New Locations</span>
          </div>
          <div className="benefit-item">
            <i className="fa-solid fa-bell"></i>
            <span>Parking Tips</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;