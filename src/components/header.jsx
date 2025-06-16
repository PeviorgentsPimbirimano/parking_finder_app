import React from "react";

const Header = () => (
  <header id="header">
    <div className="links">
      <div className="logo">
        <h1>
          Spot <span>On</span>
        </h1>
      </div>
      <nav>
        <a href="/about.html">How it works</a>
        <a href="/owner.html">Rent out your space</a>
        <a href="#">Help</a>
        <a href="#"><span>Login</span></a>
        <button className="btn">
          <a href="#"><span>Sign Up</span></a>
        </button>
      </nav>
    </div>
  </header>
);

export default Header;