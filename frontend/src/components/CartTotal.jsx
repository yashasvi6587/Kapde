import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import '../Styles/CartTotal.css';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount() || 0;
  const shipping = subtotal === 0 ? 0 : delivery_fee;
  const total = subtotal + shipping;

  return (
    <div className="cart-total-container">
      <div className="glow"></div>
      <Title text1="CART" text2="TOTALS" />
      
      <div className="cart-total-card">
        <div className="cart-line">
          <p>SubTotal</p>
          <p>{currency}{subtotal}.00</p>
        </div>

        <div className="divider"></div>

        <div className="cart-line">
          <p>Shipping Fee</p>
          <p>{currency}{shipping}.00</p>
        </div>

        <div className="divider"></div>

        <div className="cart-line total">
          <b>Total</b>
          <b>{currency}{total}.00</b>
        </div>

        {/* <button 
          className={`checkout-btn ${subtotal === 0 ? 'disabled' : ''}`}
          disabled={subtotal === 0}
        >
          {subtotal === 0 ? "Add Items to Cart" : "Proceed to Checkout"}
        </button> */}
      </div>
    </div>
  );
};

export default CartTotal;
