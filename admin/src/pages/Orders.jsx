import React, { useEffect, useState } from 'react'
import axios from "axios"
import { backendUrl, currency } from "../App"
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import '../Styles/Orders.css'


const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  // admin/src/pages/OrderDetail.jsx (snippet)
  const createShipment = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/order/shipment/${orders._id}`, {}, {
        headers: { token: adminToken }
      });
      if (data.success) {
        toast.success("Shipment created");
        // refresh order data
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || err.message);
    }
  };

  // render:



  const fetchAllOrders = async () => {
    if (!token) return null
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className="orders-container">
      <h3 className="orders-title">Orders Dashboard</h3>
      <div className="orders-list">
        {
          orders.map((order, index) => (
            <div key={index} className="order-card">
              <img src={assets.parcel_icon} alt="parcel" className="parcel-icon" />
              <div className="order-details">
                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <p key={idx}>{item.name} x {item.quantity} <span className="size">{item.size}</span></p>
                  ))}
                </div>
                <p className="customer-name">{order.address.firstName} {order.address.lastName}</p>
                <div className="address-block">
                  <p>{order.address.street},</p>
                  <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipCode}</p>
                </div>
                <p className="phone">{order.address.phone}</p>
              </div>

              <div className="payment-info">
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: <span className={order.payment ? 'paid' : 'paid'}>
                  Done
                </span></p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              <div className="amount-status">
                <p className="amount">{currency}{order.amount}</p>
                <select className="status-select" onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        }
      </div>
      <button onClick={createShipment} className="btn">Create Shipment</button>
    </div>
  )
}

export default Orders
