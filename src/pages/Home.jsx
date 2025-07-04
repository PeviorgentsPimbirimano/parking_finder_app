import React from "react";
import "../css/Home.css";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import PrimarySection from "../components/PrimarySection";
import SecondarySection from "../components/SecondarySection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <PrimarySection />
      <SecondarySection />
      <Footer />
    </div>
  );
}

