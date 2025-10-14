import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ShopContextProvider, { ShopContext } from './context/ShopContext.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="923612402791-mme6i59f6qmlftcd5ffp64etngcib4tg.apps.googleusercontent.com">
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
  </GoogleOAuthProvider>
)
