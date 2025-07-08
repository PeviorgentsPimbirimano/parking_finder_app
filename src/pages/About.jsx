import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../css/About.css"; 
import team1 from "../assets/team1.jpeg";
import team2 from "../assets/team2.jpeg";
import team3 from "../assets/team3.jpeg";

export default function About() {
  return (
    <>
      <header id="header">
          <div class="links">
              <div class="logo">
                  <h1>Spot <span>On</span></h1>
              </div>
              <nav>
                  <Link to="/">Home</Link>
                  <Link to="/Owner">Rent out your space</Link>
                  <Link to="/Help">Help</Link>
                  <Link to="/Login"><span>Login</span></Link>
                  <button class="btn"><Link to="Signup"><span>Sign Up</span></Link></button>
              </nav>
          </div>
      </header>
      <main>
        <section className="about-hero">
          <div className="about-hero-content">
            <h2>
              About <span>SpotOn</span>
            </h2>
            <p>
              Making parking hassle-free, convenient, and accessible for everyone, everywhere.
            </p>
          </div>
        </section>
        <section className="about-overview">
          <h3>Who We Are</h3>
          <p>
            SpotOn is committed to transforming how people find and rent parking spaces.
            Whether you're a driver looking for a reliable spot or a property owner wanting to maximize unused space,
            our platform connects you seamlessly and securely.
          </p>
        </section>
        <section className="about-mission">
          <div className="about-mission-content">
            <div>
              <h3>Our Mission</h3>
              <p>
                To empower drivers and space owners by providing a simple, transparent, and efficient way to rent and manage parking spaces,
                reducing city congestion and making urban mobility smarter.
              </p>
            </div>
            <div>
              <h3>Our Vision</h3>
              <p>
                To be the leading platform for parking solutions, building smarter cities where parking is no longer a problem.
              </p>
            </div>
          </div>
        </section>
        <section className="about-team">
          <h3>Meet the Team</h3>
          <div className="team-members">
            <div className="team-member">
              <img src={team1} alt="Team Member 1" />
              <h4>Peviorgents Pimbirimano</h4>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <img src={team2} alt="Team Member 2" />
              <h4>Chiyedza Smith</h4>
              <p>Lead Developer</p>
            </div>
            <div className="team-member">
              <img src={team3} alt="Team Member 3" />
              <h4>Khluivert Pimbirimano</h4>
              <p>Operations Manager</p>
            </div>
          </div>
        </section>
        <section className="about-cta">
          <h3>Join Us On Our Journey!</h3>
          <p>
            Ready to experience hassle-free parking or monetize your space? Sign up with SpotOn today!
          </p>
          <button className="btn2">
            <Link to="/Signup">Get Started</Link>
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}