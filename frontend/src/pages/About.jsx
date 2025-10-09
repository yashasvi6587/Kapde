import React from 'react';
import '../Styles/About.css';
import {assets} from "../assets/assets.js"

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1 className="fade-in">About Us</h1>
        <p className="tagline slide-up">
          "Not just clothes, but an <span>expression of your journey</span>."
        </p>
      </div>

      {/* Story Section */}
      <div className="about-story">
        <h2 className="section-title">Our Story</h2>
        <p className="fade-in">
          At <span>KAPDA</span>, we believe fashion is not just about wearing
          clothes—it’s about wearing your identity. Our journey started with a
          simple vision: <span>blend comfort, class, and creativity</span>.
        </p>

        <p className="slide-left">
          Every piece we create is inspired by the road, the ride, and the
          fearless spirit of those who wear it. 
        </p>

        <p className="slide-right">
          From timeless basics to bold statements, we ensure each collection
          reflects <span>quality craftsmanship</span> and a <span>story worth telling</span>.
        </p>
      </div>

      {/* Vision & Mission Section */}
      <div className="vision-mission">
        <div className="card zoom-in">
          <h3>✨ Our Vision</h3>
          <p>
            To redefine fashion by merging <span>road-inspired aesthetics</span> 
            with sustainable, comfortable designs.
          </p>
        </div>
        <div className="card zoom-in">
          <h3>🚀 Our Mission</h3>
          <p>
            To empower every rider, dreamer, and doer with apparel that’s 
            <span> stylish, durable, and fearless</span>.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="about-team">
        <h2 className="section-title">Meet Our Crew</h2>
        <div className="team-grid">
          <div className="team-member hover-pop">
            <img src={assets.p_img31} alt="Founder" />
            <h4>Arjun Sharma</h4>
            <p>Founder & Visionary</p>
          </div>
          <div className="team-member hover-pop">
            <img src={assets.p_img31} alt="Designer" />
            <h4>Sneha Verma</h4>
            <p>Creative Designer</p>
          </div>
          <div className="team-member hover-pop">
            <img src={assets.p_img31} alt="Marketing" />
            <h4>Rohit Singh</h4>
            <p>Marketing Head</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="about-cta">
        <h2 className="slide-up">Join Our Journey</h2>
        <a href="/collection" className="cta-btn">
          Explore Collections →
        </a>
      </div>
    </div>
  );
};

export default About;
