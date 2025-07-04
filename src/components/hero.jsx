import React, { useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [login, setLogin] = useState({ username: "", password: "" });

  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <section id="hero">
      <div className="hero-overlay"></div>
      <video
        className="hero-vid"
        src="/videos/5992516-uhd_3840_2160_30fps.mp4"
        controls
        loop
        autoPlay
        muted
      ></video>
      <div className="hero-content">
        <h3>
          Always find the <span>perfect spot</span>
        </h3>
        <div className="msg">
          <p><i class="fa-solid fa-hand-holding-dollar"></i>Best price guarantee</p>
          <p><i class="fa-solid fa-car"></i>Trusted by 13m+ drivers</p>
          <p><i class="fa-solid fa-square-parking"></i>100k+ reservable spaces</p>
        </div>
        <p>Discover thousands of convenient parking spots right where you need them. Join over 13 million drivers and experience affordable, hassle-free parking.</p>
        <button className="btn2">
          <Link to="/signup">Get Started</Link>
        </button>
      </div>

      {/* Login Box */}
      <div className="box">
        <div className="form">
          <h2>Login</h2>
          <div className="input">
            <div className="inputBox">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={login.username}
                onChange={handleLoginChange}
              />
            </div>
            <div className="inputBox">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={login.password}
                onChange={handleLoginChange}
              />
            </div>
            <div className="inputBox">
              <input type="submit" value="Sign In" />
            </div>
          </div>
          <p className="forgot">
            Forgot Password? <Link to="/signup">Click here</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;