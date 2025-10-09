import React from 'react';
import Title from '../components/Title';
import { FaMapMarkerAlt, FaPhoneAlt, FaUserTie } from 'react-icons/fa';
import { FaWhatsapp, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import '../Styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Section Title */}
      <div>
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Info Cards */}
      <div className="contact-info">
        <div className="info-card">
          <div className="icon"><FaMapMarkerAlt /></div>
          <div>
            <p className="info-title">Our Store</p>
            <p>54709 Williams Station <br /> Suite 350, Washington, USA</p>
          </div>
        </div>

        <div className="info-card">
          <div className="icon"><FaPhoneAlt /></div>
          <div>
            <p className="info-title">Tel & Email</p>
            <p>Tel: (+91) 1234567890 <br /> Email: address123@gmail.com</p>
          </div>
        </div>

        <div className="info-card">
          <div className="icon"><FaUserTie /></div>
          <div>
            <p className="info-title">Careers Forever</p>
            <p>We’re always looking for passionate individuals. Reach out to join our journey!</p>
            <button className="join-btn">Join Us</button>
            <div className="social-links">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <form className="contact-form">
        <div className="input-group">
          <input type="text" required />
          <label>Your Name</label>
        </div>
        <div className="input-group">
          <input type="email" required />
          <label>Your Email</label>
        </div>
        <div className="input-group">
          <input type="tel" required />
          <label>Phone Number</label>
        </div>
        <div className="input-group textarea">
          <textarea required></textarea>
          <label>Your Message...</label>
        </div>
        <button type="submit" className="send-btn">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
