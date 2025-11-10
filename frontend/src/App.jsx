import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from "./pages/Collection"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Product from "./pages/Product"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import Cart from "./pages/Cart"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ShippingPolicy from './pages/ShippingPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CancellationAndRefundPolicy from './pages/CancellationAndRefundPolicy'


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/collection' element={<Collection/>}  />
        <Route path='/about' element={<About/>}  />
        <Route path='/contact' element={<Contact/>}  />
        <Route path='/product/:productId' element={<Product/>}  />
        <Route path='/cart' element={<Cart/>}  />
        <Route path='/login' element={<Login/>}  />
        <Route path='/place-order' element={<PlaceOrder/>}  />
        <Route path='/orders' element={<Orders/>}  />
        <Route path='/verify' element={<Verify/>}  />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/shippingpolicy' element={<ShippingPolicy/>}/>
        <Route path='/termsandconditions' element={<TermsAndConditions/>}/>
        <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
        <Route path='/cancellationandrefundpolicy' element={<CancellationAndRefundPolicy/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
