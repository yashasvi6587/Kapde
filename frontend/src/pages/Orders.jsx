import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import '../Styles/Orders.css'
import { toast } from 'react-toastify'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const [userDetails, setUserDetails] = useState(null)

  const loadOrderData = async () => {
    try {
      if (!token) return null

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        const allOrdersItem = []
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const loadUserDetails = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/profile', {
        headers: { token }
      })
      if (response.data.success) {
        setUserDetails(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      loadOrderData()
      loadUserDetails()
    }
  }, [token])

  return (
    <div className="orders-page">
      {userDetails && (
        <div className="welcome-box">
          <h3>Welcome back, {userDetails.firstname} {userDetails.lastname}</h3>
          <p className="subtitle">This is where your story lives.</p>
          <div className="user-mark">✨ Your Mark</div>
        </div>
      )}

      <Title text1="YOUR" text2="ORDERS" />

      <div className="orders-container">
        {!token ? (
          <div className="orders-message">
            <p>Unlock the experience curated just for you.</p>
            <a href="/login" className="cta-link">Login to Begin</a>
          </div>
        ) : orderData.length === 0 ? (
          <div className="orders-message">
            <h2>No Orders Yet</h2>
            <p>Looks like your adventure hasn’t begun yet.</p>
            <a href="/collection" className="cta-link">✨ Start Exploring</a>
          </div>
        ) : (
          orderData.map((item, index) => (
            <div className="order-card" key={index}>
              <div className="order-info">
                <img src={item.image[0]} alt="product" className="order-img" />
                <div className="order-details">
                  <p className="product-name"><b>{item.name}</b></p>
                  <p>{currency}{item.price} × {item.quantity}</p>
                  <p>Size: <span>{item.size}</span></p>
                  <p>Date: <span>{new Date(item.date).toDateString()}</span></p>
                  <p>Payment: <span>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className="order-footer">
                <div className={`order-status ${item.status.toLowerCase()}`}>
                  <div className="status-dot"></div>
                  <p>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className="track-btn">TRACK ORDER</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders
