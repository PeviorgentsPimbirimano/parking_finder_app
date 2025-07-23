import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Search & Find',
      description: 'Enter your destination and browse available parking spots near you',
      icon: 'fa-solid fa-search'
    },
    {
      step: '02',
      title: 'Book & Pay',
      description: 'Reserve your spot instantly with secure payment options',
      icon: 'fa-solid fa-credit-card'
    },
    {
      step: '03',
      title: 'Park & Go',
      description: 'Arrive at your reserved spot and enjoy hassle-free parking',
      icon: 'fa-solid fa-car'
    }
  ];

  return (
    <section id="how-it-works">
      <div className="how-container">
        <h4>How SpotOn Works</h4>
        <p className="how-subtitle">Getting your perfect parking spot is easier than ever</p>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-item">
              <div className="step-number">{step.step}</div>
              <div className="step-icon">
                <i className={step.icon}></i>
              </div>
              <h5>{step.title}</h5>
              <p>{step.description}</p>
              {index < steps.length - 1 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;