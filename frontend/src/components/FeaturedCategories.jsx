import React, { useEffect, useState } from 'react';
import '../Styles/FeaturedCategories.css';
import { Link } from 'react-router-dom';

// Import images
import jacketImg1 from '../assets/feeling.png';
import jacketImg2 from '../assets/plain.png';
import jacketImg3 from '../assets/casual.png';

const products = [
  {
    title: 'Family',
    description:
      'Explore the fascinating history behind every piece in this unique collection. Each item is a conversation starter, perfect for those who appreciate a story as much as they appreciate quality craftsmanship. ',
    image: jacketImg1,
    cta: 'Discover Now',
  },
  {
    title: 'Plain',
    description:
      'Unveil a fascinating new you with this revolutionary skincare formula. It’s designed to transform your complexion, leaving you with a flawless, radiant glow. Experience the magic as your skin’s natural beauty comes to life.',
    image: jacketImg2,
    cta: 'Discover Now',
  },
  {
    title: 'Casual',
    description:
      'This amazing wall art brings a touch of modern abstraction to any space. Its intricate patterns & dynamic colors will captivate every guest. Add this unique product to your home & make a truly unforgettable statement.',
    image: jacketImg3,
    cta: 'Discover Now',
  },
];

const FeaturedCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic sliding every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="featured-collections">
      <div className="collections-header">
        <h2 className="main-headline">New Collections</h2>
        <p className="main-description">
          New drops that speak louder than words. Designed to turn heads, built to last.A new wave of color, comfort, and quiet confidence. This is where simplicity meets soul.
        </p>
      </div>

      <div className="carousel-container">
        {products.map((product, index) => (
          <div
            key={index}
            className={`carousel-product ${index === currentIndex ? 'active' : ''}`}
          >
            <div className="product-image">
              <img src={product.image} alt={product.title} />
            </div>

            <div className="product-info">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <div className="category-links">
                {['Feelings', 'Plain', 'Casual'].map((cat) => (
                  <Link key={cat} to={`/collection?subCategory=${encodeURIComponent(cat)}`}>
                    <span className={`feature-link ${cat === product.title ? 'active-feature' : ''}`}>{cat}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
