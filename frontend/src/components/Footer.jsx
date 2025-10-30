import React from 'react';
import { assets } from '../assets/assets';
import '../Styles/Footer.css';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelope, FaUserTie, FaWhatsapp, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { toast } from "react-toastify";

const Footer = () => {

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "f5395a9d-c7c1-49ca-8268-83397f536770");
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      toast.success("✅ Your message has been sent successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
    else {
      toast.error("❌ Failed to send message. Try again later.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="footer-container">
      <div className="footer-content">

        {/* Logo & Description */}
        <div className="footer-section about">
          <div className="footer-logo">
            <img
              src={assets.logo}
              alt="Kapde Logo"
              className="footer-logo-img"
            />
            <span>KAPDE</span>
          </div>

          <p className="footer-desc">
            Fashion that moves with you. Explore our exclusive collections and feel the difference.
          </p>
        </div>

        {/* Company Links */}
        <div className="footer-section links">
          <p className="footer-heading">COMPANY</p>
          <ul>
            <Link to="/"><li onClick={() => window.scrollTo(0, 0)}>Home</li></Link>
            <Link to="/collection"><li onClick={() => window.scrollTo(0, 0)}>All Collections</li></Link>
            <Link to="/about"><li onClick={() => window.scrollTo(0, 0)}>About Us</li></Link>
            <Link to="/contact"><li onClick={() => window.scrollTo(0, 0)}>Contact Us</li></Link>
            {/* <Link to="/shipping-policy"><li onClick={() => window.scrollTo(0, 0)}>Shipping Policy</li></Link>
            <Link to="/refund-policy"><li onClick={() => window.scrollTo(0, 0)}>Refund Policy</li></Link>
            <Link to="/privacy-policy"><li onClick={() => window.scrollTo(0, 0)}>Privacy Policy</li></Link>
            <Link to="/termsandconditions"><li onClick={() => window.scrollTo(0, 0)}>Terms And Conditions</li></Link> */}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <p className="footer-heading">GET IN TOUCH</p>
          <ul>
            <li>
              <FaMapMarkerAlt className="footer-icon" />
              <span>
                Sahibabad, Ghaziabad<br />
                201005, Uttar Pradesh, India
              </span>
            </li>
            <li>
              <FaEnvelope className="footer-icon" />
              <span>Storekapde@gmail.com</span>
            </li>
            <li>
              <FaUserTie className="footer-icon" />
              <span>We’re always looking for passionate individuals. Reach out to join our journey!</span>
            </li>
            <li className="social-icons">
              <a href="https://wa.me/+919456009776" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
              <a href="https://www.instagram.com/kapde.storeofficial?igsh=MXh5cGxqcXVtN2t1eA==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter/></a> */}
              {/* <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube/></a> */}
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="footer-section form">
          <p className="footer-heading">SEND A MESSAGE</p>
          <form onSubmit={onSubmit}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <textarea name="message" placeholder="Message" rows="4" required />
            <button type="submit">Send</button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        © 2025 kapde.store – All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
