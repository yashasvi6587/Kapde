import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import '../Styles/Sidebar.css' // Import external styles

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <NavLink to="/add" className="sidebar-link" title="Add Items">
        <img src={assets.add_icon} alt="Add Items" />
        <p className="hidden md:block">Add Items</p>
      </NavLink>
      <NavLink to="/list" className="sidebar-link" title="List Items">
        <img src={assets.order_icon} alt="List Items" />
        <p className="hidden md:block">List Items</p>
      </NavLink>
      <NavLink to="/orders" className="sidebar-link" title='All Orders'>
        <img src={assets.order_icon} alt="Orders" />
        <p className="hidden md:block">Orders</p>
      </NavLink>
    </aside>
  )
}

export default Sidebar
