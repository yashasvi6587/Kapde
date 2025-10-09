import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import '../Styles/SearchBar.css';
import { motion } from 'framer-motion';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes('collection'));
  }, [location]);

  if (!showSearch || !visible) return null;

  return (
    <motion.div
      className="searchbar-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="searchbar-inner"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <input
          className="searchbar-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search products..."
        />
        <img className="search-icon" src={assets.search_icon} alt="search" />
        <img
          className="cross-icon"
          onClick={() => setShowSearch(false)}
          src={assets.cross_icon}
          alt="close"
        />
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;
