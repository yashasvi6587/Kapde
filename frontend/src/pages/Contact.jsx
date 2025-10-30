import React ,{useState} from 'react';
import Title from '../components/Title';
import { FaMapMarkerAlt, FaPhoneAlt, FaUserTie } from 'react-icons/fa';
import { FaWhatsapp, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import '../Styles/Contact.css';
import { toast } from "react-toastify";

const Contact = () => {
  
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
            <p>Sector 27 <br /> Noida, Uttar Pradesh, USA</p>
          </div>
        </div>

        <div className="info-card">
          <div className="icon"><FaPhoneAlt /></div>
          <div>
            <p className="info-title">Tel & Email</p>
            <p>Tel: (+91) 94560 09776 <br /> Email: Storekapde@gmail.com</p>
          </div>
        </div>

        <div className="info-card">
          <div className="icon"><FaUserTie /></div>
          <div>
            <p className="info-title">Careers Forever</p>
            <p>We’re always looking for passionate individuals. Reach out to join our journey!</p>
            {/* <button className="join-btn">Join Us</button> */}
            <div className="social-links">
              <a href="https://wa.me/+919456009776" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
              <a href="https://www.instagram.com/kapde.storeofficial?igsh=MXh5cGxqcXVtN2t1eA==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a> */}
              {/* <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a> */}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <form className="contact-form" onSubmit={onSubmit}>
        <div className="input-group">
          <input name='name' type="text" required />
          <label>Your Name</label>
        </div>
        <div className="input-group">
          <input name='email' type="email" required />
          <label>Your Email</label>
        </div>
        <div className="input-group">
          <input name='phone' type="tel" required />
          <label>Phone Number</label>
        </div>
        <div className="input-group textarea">
          <textarea name='message' required></textarea>
          <label>Your Message...</label>
        </div>
        <button  type="submit" className="send-btn">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
