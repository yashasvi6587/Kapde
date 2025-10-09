import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import "../Styles/ForgotPassword.css";

const ForgotPassword = () => {
  const { backendUrl } = useContext(ShopContext);
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
      toast.success(data.msg || "If account exists, reset link sent.");
    } catch (err) {
      toast.error(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="forgot-wrapper">
      <form className="forgot-form" onSubmit={submit}>
        <h2 className="forgot-title">🔑 Forgot Password</h2>
        <p className="forgot-subtitle">
          Enter your registered email and we’ll send you a reset link.
        </p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          required
          className="forgot-input"
        />

        <button type="submit" className="forgot-btn">
          Send Reset Link
        </button>

        <p className="forgot-hint">
          Didn’t receive the email? <span>Check your spam</span> or try again.
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
