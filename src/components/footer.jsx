import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <section id="footer">
    <div className="left-foot">
      <div>
        <h5>Information</h5>
        <ul>
          <li>About us</li>
          <li>Blog</li>
          <li>Careers</li>
          <li>Media coverage</li>
          <li>Site map</li>
        </ul>
      </div>
      <div>
        <h5>Services</h5>
        <ul>
          <li>Business accounts</li>
          <li>Car park management</li>
          <li>Rent out your space</li>
        </ul>
      </div>
      <div>
        <h5>Point of interest</h5>
        <ul>
          <li>Airports parking</li>
          <li>Hospitals parking</li>
          <li>City parking</li>
          <li>Station parking</li>
          <li>Stadium parking</li>
        </ul>
      </div>
      <div>
        <h5>Get in touch</h5>
        <ul>
          <li>How SpotOn works</li>
          <li>Help centre</li>
        </ul>
      </div>
    </div>
    <div className="right-foot">
      <div className="logo">
        <h1>
          Spot <span>On</span>
        </h1>
      </div>
      <p>
        <i className="fas fa-paper-plane"></i>
        peviorgentspimbirimano@gmail.com
      </p>
      <p>
        <i className="fas fa-phone-square-alt"></i>
        0774947792
      </p>
      <div className="social-icons">
        <Link to="https://facebook.com/">
          <i className="fab fa-facebook"></i>
        </Link>
        <Link to=" ">
          <i className="fab fa-twitter-square"></i>
        </Link>
        <Link to=" ">
          <i className="fab fa-instagram"></i>
        </Link>
        <Link to=" ">
          <i className="fab fa-linkedin"></i>
        </Link>
      </div>
      <br />
    </div>
  </section>
);

export default Footer;