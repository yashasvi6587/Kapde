import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import '../Styles/OrderPlace.css'

const OrderPlace = () => {
  const [method, setMethod] = useState('cod')
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order, orderData) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Order Payment",
    description: "Order Payment",
    order_id: order.id,
    receipt: order.receipt,
    handler: async (response) => {
      try {
        const verifyPayload = {
          ...response,
          items: orderData.items,
          amount: orderData.amount,
          address: orderData.address,
        };

        const { data } = await axios.post(
          backendUrl + "/api/order/verifyRazorpay",
          verifyPayload,
          { headers: { token } }
        );

        if (data.success) {
          navigate("/orders");
          setCartItems({});
        } else {
          toast.error(data.message || "Payment verification failed");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
};


  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (!token) {
      try {
        let orderItems = []
        for (const items in cartItems) {
          for (const item in cartItems[items]) {
            if (cartItems[items][item] > 0) {
              const itemInfo = structuredClone(products.find(product => product._id === items))
              if (itemInfo) {
                itemInfo.size = item
                itemInfo.quantity = cartItems[items][item]
                orderItems.push(itemInfo)
              }
            }
          }
        }

        let orderData = {
          ...formData,
          items: orderItems,
          amount: getCartAmount() + delivery_fee
        }

        const response = await axios.post(backendUrl + "/api/order/guest", orderData)
        if (response.data.success) {
          setCartItems({})
          navigate("/orders")
        } else {
          toast.error("Failed to place guest order")
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
      return
    }

    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            navigate('/login')
          }
          break
        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order, orderData);

          } else {
            navigate("/login")
          }
          break
        default:
          break
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const res = await axios.get(backendUrl + "/api/user/details", {
          headers: { token }
        })
        if (res.data.success) {
          setFormData(prev => ({
            ...prev,
            firstName: res.data.data.firstname,
            lastName: res.data.data.lastname,
            email: res.data.data.email,
            street: res.data.data.street || "",
            city: res.data.data.city || "",
            state: res.data.data.state || "",
            zipCode: res.data.data.zipcode || "",
            country: res.data.data.country || "",
            phone: res.data.data.phone || ""
          }))
        }
      }
    }
    fetchUser()
  }, [token])



  return (
  <div className="place-order-page">
    <form onSubmit={onSubmitHandler} className="place-order-form">
      {/* -------- Delivery Info -------- */}
      <div className="card">
        <h2 className="title">Delivery Information</h2>
        <div className="delivery-row">
          <input name="firstName" value={formData.firstName} onChange={!token ? onChangeHandler : undefined} readOnly={!!token} required placeholder="First Name" />
          <input name="lastName" value={formData.lastName} onChange={!token ? onChangeHandler : undefined} readOnly={!!token} required placeholder="Last Name" />
          <input name="email" value={formData.email} onChange={!token ? onChangeHandler : undefined} readOnly={!!token} required placeholder="Email" />
          <input name="street" value={formData.street} onChange={onChangeHandler} required placeholder="Street" />
          <input name="city" value={formData.city} onChange={onChangeHandler} required placeholder="City" />
          <input name="state" value={formData.state} onChange={onChangeHandler} required placeholder="State" />
          <input name="zipCode" value={formData.zipCode} onChange={onChangeHandler} required placeholder="Zip Code" />
          <input name="country" value={formData.country} onChange={onChangeHandler} required placeholder="Country" />
          <input name="phone" value={formData.phone} onChange={onChangeHandler} required placeholder="Phone" />
        </div>
      </div>

      {/* -------- Payment Info -------- */}
      <div className="card">
        <h2 className="title">Payment Method</h2>
        <div className="payment-methods">
          <div className={`payment-option ${method === 'razorpay' ? 'selected' : ''}`} onClick={() => setMethod('razorpay')}>
            <p className={method === 'razorpay' ? 'selected' : ''}></p>
            <img src={assets.razorpay_logo} alt="Razorpay" />
            <span>Razorpay (Online)</span>
          </div>

          <div className={`payment-option ${method === 'cod' ? 'selected' : ''}`} onClick={() => setMethod('cod')}>
            <p className={method === 'cod' ? 'selected' : ''}></p>
            <img src={assets.cod_logo} alt="Cash on Delivery" />
            <span>Cash on Delivery</span>
          </div>
        </div>

        <button
          type="submit"
          className="place-order-btn"
          onClick={() => window.scrollTo(0, 0)}
        >
          Place Order
        </button>
      </div>
    </form>
  </div>
)

}

export default OrderPlace;
