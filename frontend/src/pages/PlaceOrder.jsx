import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import "../Styles/PlaceOrder.css";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

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
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      if (method === "cod") {
        const response = await axios.post(
          backendUrl + "/api/order/place",
          orderData,
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems({});
          navigate("/orders");
        } else navigate("/login");
      } else if (method === "razorpay") {
        const responseRazorpay = await axios.post(
          backendUrl + "/api/order/razorpay",
          orderData,
          { headers: { token } }
        );
        if (responseRazorpay.data.success) {
          initPay(responseRazorpay.data.order, orderData);
        } else navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const res = await axios.get(backendUrl + "/api/user/details", {
          headers: { token },
        });
        if (res.data.success) {
          setFormData((prev) => ({
            ...prev,
            firstName: res.data.data.firstname,
            lastName: res.data.data.lastname,
            email: res.data.data.email,
            street: res.data.data.street || "",
            city: res.data.data.city || "",
            state: res.data.data.state || "",
            zipCode: res.data.data.zipcode || "",
            country: res.data.data.country || "",
            phone: res.data.data.phone || "",
          }));
        }
      }
    };
    fetchUser();
  }, [token]);

  return (
    <div className="placeorder-container">
      <form className="placeorder-form" onSubmit={onSubmitHandler}>
        <h2 className="form-title">Delivery Information</h2>
        <div className="form-grid">
          {[
            "firstName",
            "lastName",
            "email",
            "street",
            "city",
            "state",
            "zipCode",
            "country",
            "phone",
          ].map((field, idx) => (
            <input
              key={idx}
              name={field}
              value={formData[field]}
              onChange={onChangeHandler}
              placeholder={
                field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")
              }
              required
            />
          ))}
        </div>

        <div className="cart-total-section">
          <CartTotal />
        </div>

        <h2 className="form-title">Payment Method</h2>
        <div className="payment-options">
          <div
            className={`payment-card ${
              method === "razorpay" ? "active" : ""
            }`}
            onClick={() => setMethod("razorpay")}
          >
            <img src={assets.razorpay_logo} alt="Razorpay" />
            {/* <span>Razorpay</span> */}
          </div>
          <div
            className={`payment-card ${method === "cod" ? "active" : ""}`}
            onClick={() => setMethod("cod")}
          >
            <img src={assets.cod_logo} alt="COD" />
            {/* <span>Cash on Delivery</span> */}
          </div>
        </div>

        <button type="submit" className="placeorder-btn" onClick={window.scrollTo(0,0)}>
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
