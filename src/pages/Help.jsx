import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../css/Help.css";

const faqs = [
  {
    question: "How do I book a parking spot?",
    answer: "Sign up or log in, search for your desired location, select a parking spot, and follow the booking prompts to reserve your space."
  },
  {
    question: "How do I list my parking space?",
    answer: 'Go to the "Rent Out Your Space" page, fill in your details and submit the form. Your listing will be reviewed and published for drivers to book.'
  },
  {
    question: "Is my payment information safe?",
    answer: "Yes. We use secure, encrypted payment processing to keep your data safe at all times."
  },
  {
    question: "How do I contact support?",
    answer: 'You can email us at <a href="mailto:peviorgentspimbirimano@gmail.com">peviorgentspimbirimano@gmail.com</a> or use the contact form below for direct assistance.'
  },
  {
    question: "Can I cancel or change my booking?",
    answer: "Yes. Visit your bookings page, select the booking you wish to change, and follow the instructions to modify or cancel your reservation (subject to our cancellation policy)."
  }
];

export default function Help() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleFaqClick = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting SpotOn! We will get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
    <header id="header">
        <div class="links">
            <div class="logo">
                <h1>Spot <span>On</span></h1>
            </div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/About">About Us</Link>
                <Link to="/Owner">Rent out your space</Link>
                <Link to="/Login"><span>Login</span></Link>
                <button class="btn"><Link to="/Signup"><span>Sign Up</span></Link></button>
            </nav>
        </div>
    </header>
      <main>
        <section className="help-hero">
          <h2>How can we help?</h2>
          <p>Your questions answered, your issues resolved. Find help below or contact us directly.</p>
        </section>
        <section className="help-faq">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div className={`faq-item${openFaq === idx ? " open" : ""}`} key={idx}>
                <button
                  className="faq-question"
                  onClick={() => handleFaqClick(idx)}
                  aria-expanded={openFaq === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  {faq.question}
                </button>
                <div
                  className="faq-answer"
                  id={`faq-answer-${idx}`}
                  style={{ display: openFaq === idx ? "block" : "none" }}
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            ))}
          </div>
        </section>
        <section className="help-contact">
          <h3>Need More Help?</h3>
          <form className="help-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="help-name">Name</label>
              <input
                type="text"
                id="help-name"
                name="name"
                required
                value={form.name}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="help-email">Email</label>
              <input
                type="email"
                id="help-email"
                name="email"
                required
                value={form.email}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="help-message">How can we help you?</label>
              <textarea
                id="help-message"
                name="message"
                rows="3"
                required
                value={form.message}
                onChange={handleFormChange}
              ></textarea>
            </div>
            <button type="submit" className="btn2">
              Send Message
            </button>
          </form>
          <p className="direct-contact">
            Or email us directly at{" "}
            <Link to="mailto:peviorgentspimbirimano@gmail.com">
              peviorgentspimbirimano@gmail.com
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}