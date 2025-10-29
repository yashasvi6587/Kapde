import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import "../Styles/CartOfferBanner.css";
import { Link } from "react-router-dom";

const CartOfferBanner = ({ totalItems }) => {
  const { getCartAmount, currency } = useContext(ShopContext);
  const subtotal = getCartAmount() || 0;
  const remaining = 1000 - subtotal;

  // Hide banner if already eligible
  if (subtotal >= 1000) {
    return (
      <div className="offer-banner unlocked">
        <div className="offer-content">
          <h1 className="offer-heading">
            🎉 Congrats! You’ve Unlocked <span>10% OFF</span>
          </h1>
          <p className="offer-subtext">
            Enjoy your <strong>exclusive discount</strong> on all items above ₹1000!
          </p>
          <Link to={"/collection"}><button onClick={window.scrollTo(0,0)} className="offer-btn">Shop More & Save</button></Link>
        </div>
        <div className="shine" />
      </div>
    );
  }

  // Show progress banner if under ₹1000
  return (
    <div className="offer-banner">
      <div className="offer-content">
        <h1 className="offer-heading">
          Spend ₹1000 To Unlock <span>10% OFF</span>
        </h1>
        <p className="offer-subtext">
          You’re just <span>{currency}{remaining.toFixed(2)}</span> away from your reward 🛍️
        </p>
        <Link to={"/collection"}><button onClick={window.scrollTo(0,0)} className="offer-btn">Add More Items</button></Link>
      </div>
      <div className="shine" />
    </div>
  );
};

export default CartOfferBanner;
