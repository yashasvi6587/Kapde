import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import '../Styles/PlaceOrder.css'

const PlaceOrder = () => {
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
  <div className="min-h-screen flex items-center justify-center bg-white p-4">
    <form onSubmit={onSubmitHandler} className="w-full max-w-3xl p-6 bg-white  space-y-10">

      {/* Delivery Information */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Delivery Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={!token ? onChangeHandler : undefined}
            readOnly={!!token}
            required
            placeholder="First Name"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={!token ? onChangeHandler : undefined}
            readOnly={!!token}
            required
            placeholder="Last Name"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            name="email"
            value={formData.email}
            onChange={!token ? onChangeHandler : undefined}
            readOnly={!!token}
            required
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none md:col-span-2"
          />
          <input
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            required
            placeholder="Street"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none md:col-span-2"
          />
          <input
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            required
            placeholder="City"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            required
            placeholder="State"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            name="zipCode"
            value={formData.zipCode}
            onChange={onChangeHandler}
            required
            placeholder="Zip Code"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            required
            placeholder="Country"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            required
            placeholder="Phone"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Cart Total */}
      <div className="my-4">
        <CartTotal />
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Payment Method</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div
            className={`flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:border-blue-500 ${
              method === 'razorpay' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onClick={() => setMethod('razorpay')}
          >
            <p className={`w-4 h-4 rounded-full border-2 ${method === 'razorpay' ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}></p>
            <img src={assets.razorpay_logo} alt="Razorpay" className="h-6" />
          </div>
          <div
            className={`flex items-center gap-2 p-4 border rounded-lg cursor-pointer hover:border-blue-500 ${
              method === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onClick={() => setMethod('cod')}
          >
            <p className={`w-4 h-4 rounded-full border-2 ${method === 'cod' ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}></p>
            <img src={assets.cod_logo} alt="COD" className="h-6" />
          </div>
        </div>
      </div>

      {/* Place Order */}
      <button
        type="submit"
        onClick={() => window.scrollTo(0, 0)}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Place Order
      </button>
    </form>
  </div>
);



}

export default PlaceOrder
