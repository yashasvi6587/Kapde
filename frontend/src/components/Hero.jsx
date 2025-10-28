import React from "react";
import "../Styles/Hero.css";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="hero">
      {/* Background Video */}
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={assets.hero_video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Left Content */}
      <div className="hero-left">
        <h4 className="hero-subtitle">KAPDE - ASSETS - T - SHIRTS</h4>

        <div className="social-links">
          <p>Social Community :</p>
          <ul>
            <li> <a href="https://wa.me/+918826271392" target="_blank" rel="noopener noreferrer">WHATS APP</a></li>
            {/* <li>YOUTUBE</li> */}
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></li>
          </ul>
          <p className="phone">+91 - 8826271392</p>
        </div>
      </div>

      {/* Center Content */}
      <div className="hero-center">
        <p className="hero-tagline">
          Redefining streetwear with bold, functional, and timeless designs.
        </p>
        <h1 className="brand-title">KAPDE</h1>
        <div className="hero-buttons">
          <Link to={"/collection"}><button className="hero-btn">Browse Collection</button></Link>
          <Link to={"/collection"}><button className="hero-btn">Shop Now</button></Link>



        </div>
      </div>

      {/* Right Content */}
      <div className="hero-right">
        {['White', 'Black', 'Coloured'].map((cat) => (
                    <div key={cat}>
                      <Link to={`/collection?category=${encodeURIComponent(cat)}`}>
                        <p className="features">{cat}</p>
                      </Link>
                    </div>
                  ))}
      </div>

      {/* Bottom Bar */}
      <div className="hero-bottom">
        <p>FOR EVERYONE <span>MADE WITH CARE</span></p>
        <p className="hashtag">#KAPDE</p>
        <p>FOR EVERY STYLE <span>BUILT FOR COMFORT</span></p>
      </div>
    </section>
  );
};

export default Hero;
