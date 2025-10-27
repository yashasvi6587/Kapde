import React from "react";
import "../Styles/Testimonials.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { assets } from "../assets/assets.js";

const testimonialsData = [
  {
    name: "Ananya Sharma",
    review: "Absolutely love the quality of the clothes! Fast delivery and excellent service.",
    img: assets.women,
  },
  {
    name: "Rohit Verma",
    review: "Great experience shopping here. Easy returns and amazing collection!",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Priya Singh",
    review: "Stylish clothes at affordable prices. Highly recommended! I found it incredibly easy to manage",
    img: assets.testimonial2,
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2 className="testimonial-heading">What Our Customers Say</h2>
      <div className="testimonial-grid">
        {testimonialsData.map((item, index) => (
          <div key={index} className="testimonial-item">
            <FaQuoteLeft className="quote-icon-left" />
            <p className="testimonial-text">{item.review}</p>
            <FaQuoteRight className="quote-icon-right" />
            <div className="testimonial-user">
              <img src={item.img} alt={item.name} />
              <h4>{item.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
