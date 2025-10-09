import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import './Styles/App.css' // ⬅️ Import custom CSS

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "₹"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className="admin-app">
      <ToastContainer />
      {
        token === ''
          ? <Login setToken={setToken} />
          : (
            <>
              <Navbar setToken={setToken} />
              <hr className="divider" />
              <div className="admin-layout">
                <Sidebar />
                <div className="admin-content">
                  <Routes>
                    <Route path="/add" element={<Add token={token} />} />
                    <Route path="/list" element={<List token={token} />} />
                    <Route path="/orders" element={<Orders token={token} />} />
                  </Routes>
                </div>
              </div>
            </>
          )
      }
    </div>
  )
}

export default App
