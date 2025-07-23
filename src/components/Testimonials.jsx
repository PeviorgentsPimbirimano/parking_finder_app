import React, { useState, useEffect } from 'react';
import '../css/Home.css'
const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Harare, Zimbabwe',
      rating: 5,
      text: 'SpotOn saved me so much time finding parking downtown. The app is super easy to use and the spots are always available as promised!',
      avatar: { src: 'src/assets/teamCard-img3.png' }
    },
    {
      name: 'Michael Chen',
      location: 'Bulawayo, Zimbabwe',
      rating: 5,
      text: 'As a space owner, I love the extra income SpotOn brings me. The platform handles everything seamlessly.',
      avatar: { src: 'src/assets/teamCard-img1.png' }
    },
    {
      name: 'Emily Rodriguez',
      location: 'Victoria Falls, Zimbabwe',
      rating: 5,
      text: 'Never struggled with airport parking again! SpotOn made my travel experience so much smoother.',
      avatar: { src: 'src/assets/teamCard-img4.png' }
    },
    {
      name: 'David Thompson',
      location: 'Mutare, Zimbabwe',
      rating: 5,
      text: 'The peace of mind knowing my car is in a secure, verified spot is priceless. Highly recommend SpotOn!',
      avatar: { src: 'src/assets/teamCard-img6.png' }
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials">
      <div className="testimonials-container">
        <h4>What Our Users Say</h4>
        <p className="testimonials-subtitle">Join thousands of satisfied drivers and space owners</p>
        
        <div className="testimonial-slider">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="stars">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star"></i>
                ))}
              </div>
              <p>"{testimonials[currentTestimonial].text}"</p>
              <div className="testimonial-author">
                <div className="avatar">
                  <img
                    src={testimonials[currentTestimonial].avatar.src}
                    alt={testimonials[currentTestimonial].name}
                  />
                </div>
                <div className="author-info">
                  <h6>{testimonials[currentTestimonial].name}</h6>
                  <span>{testimonials[currentTestimonial].location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
