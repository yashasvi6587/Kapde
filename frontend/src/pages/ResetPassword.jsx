import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import "../Styles/ResetPassword.css";

const ResetPassword = () => {
  const { backendUrl, setToken } = useContext(ShopContext);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link");
      navigate("/");
    }
  }, [token, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return toast.error("Passwords do not match");
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/reset-password`,
        { token, password }
      );
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }
      toast.success(data.msg || "Password reset successful");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="reset-wrapper">
      <form onSubmit={submit} className="reset-card">
        <h2 className="reset-title">🔐 Set New Password</h2>

        {/* Password */}
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
          <span
            className="toggle-visibility"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="input-box">
          <input
            type={showConfirm ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
            required
          />
          <span
            className="toggle-visibility"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? "🙈" : "👁"}
          </span>
        </div>

        {/* Button */}
        <button type="submit" className="reset-btn">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
