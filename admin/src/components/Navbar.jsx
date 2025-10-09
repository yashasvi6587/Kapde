import React from 'react'
import { assets } from '../assets/assets'
import '../Styles/Navbar.css' // ⬅️ Import external styles

const Navbar = ({ setToken }) => {
  return (
    <nav className="admin-navbar">
      <div className="navbar-left ">
        <p>KAPDE</p>
        <span className="navbar-title">Admin Dashboard</span>
      </div>
      <button className="logout-btn" onClick={() => setToken('')}>
        Logout
      </button>
    </nav>
  )
}

export default Navbar
