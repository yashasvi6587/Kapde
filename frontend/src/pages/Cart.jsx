import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom'
import '../Styles/Cart.css'
import CartOfferBanner from '../components/CartOfferBanner';


const Cart = () => {
  const { token, products, currency, cartItems, updateQuantity } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  return (
    <div className="cart-container">
      <div className="cart-title">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Empty cart fancy UI */}
      {cartData.length === 0 ? (
        <div className="empty-cart-row fade-in">
          <img src={assets.empty_cart} alt="Empty Cart" className="empty-cart-img" />

          <div className="empty-cart-content">
            <h2>Your cart feels lonely 🛒</h2>
            <p>Looks like you haven’t added anything yet. Let’s change that!</p>

            <div className="empty-cart-buttons">
              <button
                className="explore-btn"
                onClick={() => {
                  navigate('/collection')
                  window.scrollTo(0, 0)
                }}
              >
                Browse Collection ✨
              </button>
            </div>
          </div>

          <img src={assets.empty_cart} alt="Empty Cart" className="empty-cart-img" />
        </div>
      ) : (
        <>
          <div className="cart-items-container">
            {cartData.map((item, index) => {
              const productsData = products.find((product) => product._id === item._id)
              if (!productsData) return null

              return (
                <div className="cart-item slide-up" key={index}>
                  <div className="cart-product">
                    <img src={productsData.image?.[0]} alt={productsData.name} />
                    <div className="cart-details">
                      <p className="product-name">{productsData.name}</p>
                      <p className="product-price">{currency}{productsData.price}</p>
                      <p className="product-size">Size: <strong>{item.size}</strong></p>
                    </div>
                  </div>
                  <div className="cart-actions">
                    <input
                      onChange={(e) =>
                        e.target.value === '' || e.target.value === '0'
                          ? null
                          : updateQuantity(item._id, item.size, Number(e.target.value))
                      }
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                    />
                    <img
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      src={assets.bin_icon}
                      alt="Delete"
                      className="delete-icon"
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <CartOfferBanner totalItems={cartData.reduce((sum, i) => sum + i.quantity, 0)} />


          <div className="checkout-section zoom-in">
            <CartTotal />
            <button
              className="checkout-btn"
              onClick={() => {
                if (token) {
                  navigate('/place-order');
                  window.scrollTo(0, 0);
                } else {
                  navigate('/login');
                  window.scrollTo(0, 0);
                }
              }}
            >
              PROCEED TO CHECKOUT →
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
