import React from "react";

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
      <h1>SpotOn</h1>
      <p>
        <i className="fas fa-paper-plane"></i>
        peviorgentspimbirimano@gmail.com
      </p>
      <p>
        <i className="fas fa-phone-square-alt"></i>
        0774947792
      </p>
      <div className="social-icons">
        <a href="https://facebook.com/">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="">
          <i className="fab fa-twitter-square"></i>
        </a>
        <a href="">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
      <br />
    </div>
  </section>
);

export default Footer;