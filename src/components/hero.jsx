import React, { useState } from "react";

const Hero = () => {
  const [login, setLogin] = useState({ username: "", password: "" });

  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <section id="hero">
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
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        <button className="btn2">
          <a href="#">Get Started</a>
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
            Forgot Password? <a href="#">Click here</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;