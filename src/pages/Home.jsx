import React from "react";
import "../css/Home.css";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import PrimarySection from "../components/PrimarySection";
import SecondarySection from "../components/SecondarySection";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import LiveActivity from "../components/LiveActivity";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <PrimarySection />
      <Testimonials />
      <SecondarySection />
      <LiveActivity />
      <Newsletter />
      <Footer />
    </div>
  );
}

