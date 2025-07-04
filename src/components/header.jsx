import React from "react";
import { Link } from "react-router-dom";
import '../css/Home.css';

const Header = () => (
  <header id="header">
    <div className="links">
      <div className="logo">
        <h1>
          Spot <span>On</span>
        </h1>
      </div>
      <nav>
        <Link to="/About">About Us</Link>
        <Link to="/Owner">Rent out your space</Link>
        <Link to="/Help">Help</Link>
        <Link to="/Login"><span>Login</span></Link>
        <button className="btn">
          <Link to="Signup"><span>Sign Up</span></Link>
        </button>
      </nav>
    </div>
  </header>
);

export default Header;