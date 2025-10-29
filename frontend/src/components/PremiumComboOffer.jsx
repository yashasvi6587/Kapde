import React from "react";
import "../Styles/PremiumComboOffer.css";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const PremiumComboOffer = () => {
  return (
    <section className="premium-offer-banner">
      <div className="carousel-bg">
        <img src={assets.feeling} alt="Feeling look" />
        <img src={assets.casual} alt="Casual look" />
        <img src={assets.plain} alt="Plain look" />
      </div>
      <div className="premium-offer-content">
        <h1 className="premium-heading">
          Spend ₹1000 & Get <span>10% OFF</span> Instantly
        </h1>
        <p className="premium-subtext">
          Limited-time reward for our loyal shoppers — grab your favorites now and save big.
        </p>
        <Link to={'/collection'} >
        <button
          className="premium-btn"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Explore Collection →
        </button>
        </Link>
      </div>
      <div className="premium-shine"></div>
    </section>
  );
};

export default PremiumComboOffer;
