import React from "react";
import "../Styles/USP.css";
import { FaShippingFast, FaUndoAlt, FaCheckCircle, FaLock } from "react-icons/fa";

const USP = () => {
  const usps = [
    { icon: <FaShippingFast />, title: "Free Shipping", desc: "On all orders above ₹999" },
    { icon: <FaUndoAlt />, title: "Easy Returns", desc: "30-day hassle-free returns" },
    { icon: <FaCheckCircle />, title: "100% Quality", desc: "Premium quality guaranteed" },
    { icon: <FaLock />, title: "Secure Payment", desc: "Safe & secure checkout" },
  ];

  return (
    <section className="usp-section">
      <div className="usp-container">
        {usps.map((item, index) => (
          <div key={index} className="usp-item">
            <div className="usp-icon">{item.icon}</div>
            <h3 className="usp-title">{item.title}</h3>
            <p className="usp-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default USP;
