import React, { useContext, useState, useRef, useEffect } from 'react';
import { assets } from "../assets/assets.js";
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';
import '../Styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (!token) {
      navigate('/login');
    } else {
      setShowDropdown(prev => !prev);
    }
  };

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  const isCollectionPage = location.pathname === '/collection';

  return (
    <div className="navbar-container">
      {/* Top Sub Navbar */}
      <div className="sub-navbar">
        Exclusive Summer Collection! Limited Time Offer 🌞✨
      </div>

      {/* Main Navbar */}
      <div className="main-navbar">
        <Link to="/" className="logo">KAPDE</Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          {[
            { label: 'Home', path: '/' },
            { label: 'All Collections', path: '/collection' },
            { label: 'About Us', path: '/about' },
            // { label: 'Road Stories', path: '/roadstories' },
            { label: 'Your Orders', path: '/orders' },
            { label: 'Contact Us', path: '/contact' },
          ].map(({ label, path }, idx) => (
            <li key={idx}>
              <NavLink
                to={path}
                className={({ isActive }) => isActive ? 'active-link' : ''}
              >
                {label}
                <span className="underline"></span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Icons */}
        <div className="right-icons">
          {isCollectionPage && (
            <img
              src={assets.search_icon}
              alt="Search"
              className="icon"
              onClick={() => setShowSearch(true)}
            />
          )}

          <div className="profile-cart">
            <span
              className="profile-text"
              onClick={() => {
                if (!token) {
                  navigate('/login');
                } else {
                  logout();
                }
              }}
            >
              {token ? 'Logout' : 'Login'}
            </span>

            <Link to="/cart" className="cart-icon">
              <img src={assets.cart_icon} alt="Cart" />
              {getCartCount() > 0 && <span className="cart-count">{getCartCount()}</span>}
            </Link>
          </div>


          <img
            src={assets.menu_icon}
            alt="Menu"
            className="hamburger"
            onClick={() => setMobileMenu(true)}
          />
        </div>
      </div>

      {/* Category Navbar */}
      <div className="category-navbar">
        <div className="category-group">
          {['Family', 'Plain', 'Casual'].map((item) => (
            <div key={item}>
              <Link to={`/collection?subCategory=${encodeURIComponent(item)}`}>
                <p className="category-item">{item}</p>
              </Link>
            </div>
          ))}
        </div>

        <div className="category-group">
          {['Half Cut', 'Full Sleeves', 'Black', 'White'].map((cat) => (
            <div key={cat}>
              <Link to={`/collection?category=${encodeURIComponent(cat)}`}>
                <p className="category-item">{cat}</p>
              </Link>
            </div>
          ))}
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="mobile-menu">
          <div className="mobile-back" onClick={() => setMobileMenu(false)}>
            <img src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setMobileMenu(false)} to="/">Home</NavLink>
          <NavLink onClick={() => setMobileMenu(false)} to="/collection">All Collections</NavLink>
          <NavLink onClick={() => setMobileMenu(false)} to="/about">About Us</NavLink>
          <NavLink onClick={() => setMobileMenu(false)} to="/contact">Contact Us</NavLink>
          <NavLink onClick={() => setMobileMenu(false)} to="/orders">Your Orders</NavLink>
          {!token ? (
            <NavLink onClick={() => setMobileMenu(false)} to="/login">Login</NavLink>
          ) : (
            <p onClick={() => { logout(); setMobileMenu(false); }}>Logout</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
