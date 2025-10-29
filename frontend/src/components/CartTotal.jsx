import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import '../Styles/CartTotal.css';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount() || 0;
  const shipping = subtotal === 0 ? 0 : delivery_fee;
  const discount = subtotal > 1000 ? subtotal * 0.1 : 0;
  const total = subtotal - discount + shipping;

  return (
    <div className="cart-total-container">
      <div className="glow"></div>
      <Title text1="CART" text2="TOTALS" />

      <div className="cart-total-card">
        <div className="cart-line">
          <p>SubTotal</p>
          <p>{currency}{subtotal.toFixed(2)}</p>
        </div>

        {discount > 0 && (
          <>
            <div className="divider"></div>

            {/* ✨ Discount message */}
            <div className="discount-banner">
              <span className="star">⭐</span>
              <span className="discount-text">Congrats! Discount Applied</span>
              <span className="star">⭐</span>
            </div>

            <div className="cart-line discount">
              <p>10% Discount</p>
              <p>-{currency}{discount.toFixed(2)}</p>
            </div>
          </>
        )}

        <div className="divider"></div>

        <div className="cart-line">
          <p>Shipping Fee</p>
          <p>{currency}{shipping.toFixed(2)}</p>
        </div>

        <div className="divider"></div>

        <div className="cart-line total">
          <b>Total</b>
          <b>{currency}{total.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
