import React from "react";
import { Link } from "react-router-dom";

const PrimarySection = () => (
  <section id="primary">
    <div className="container">
      <h4>Rent Out Your Parking Space</h4>
      <div className="content">
        <img
          src="/images/Современное здание фон и асфальтовая дорога в Шанхае, Китай _ Премиум Фото.jpeg"
          alt="Parking Space"
        />
        <div className="layer">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Praesentium maxime sequi numquam.
          </p>
          <button className="btn2">
            <Link to="/Signup">Get Started</Link>
          </button>
        </div>
      </div>
    </div>
    <div className="container">
      <h4>Car Park Management</h4>
      <div className="content">
        <img src="/images/download (10).jpeg" alt="Car Park Management" />
        <div className="layer">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Praesentium maxime sequi numquam.
          </p>
          <button className="btn2">
            <Link to="/Signup">Get Started</Link>
          </button>
        </div>
      </div>
    </div>
    <hr />
  </section>
);

export default PrimarySection;