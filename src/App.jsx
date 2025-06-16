import React from "react";
import "./App.css";
import Header from "./components/header";
import Hero from "./components/hero";
import Features from "./components/features";
import PrimarySection from "./components/primarySection";
import SecondarySection from "./components/secondarySection";
import Footer from "./components/footer";

function App() {
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

export default App;