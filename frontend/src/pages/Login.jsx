import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from "axios"
import { toast } from 'react-toastify'
import '../Styles/Login.css'
import { GoogleLogin } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, backendUrl, navigate, getUserCart } = useContext(ShopContext)

  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false) // ✅ new state
  const [street, setStreet] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { firstname, lastname, email, password, street, phone, zipcode, state, city, country })
        if (response.data.success) {
          localStorage.setItem('token', response.data.token)
          setToken(response.data.token)
          await getUserCart(response.data.token)
          navigate("/login")
          window.scrollTo({ top: 0, behavior: 'smooth' })
          toast.success("Registration successful!")
        } else {
          toast.error(response.data.msg)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (response.data.success) {
          localStorage.setItem('token', response.data.token)
          setToken(response.data.token)
          await getUserCart(response.data.token)
          navigate("/login")
          window.scrollTo({ top: 0, behavior: 'smooth' })
          toast.success("Login successful!")
        } else {
          toast.error(response.data.msg || response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      const fullName = decoded.name || ""
      const [first, ...rest] = fullName.split(" ")
      const last = rest.join(" ")
      const res = await axios.post(backendUrl + "/api/user/google-login", {
        email: decoded.email,
        firstname: first || "",
        lastname: last || "",
        googleId: decoded.sub
      })

      if (res.data.token) {
        localStorage.setItem("token", res.data.token)
        setToken(res.data.token)
        await getUserCart(res.data.token)
        toast.success("Logged in with Google")
      } else {
        toast.error("Google login failed")
      }
    } catch (error) {
      console.error(error)
      toast.error("Google login error")
    }
  }

  useEffect(() => { if (token) navigate('/') }, [token])
  useEffect(() => {
    if (token) {
      const pending = localStorage.getItem("pendingOrder")
      if (pending) {
        const orderData = JSON.parse(pending)
        axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } })
          .then(res => {
            if (res.data.success) {
              localStorage.removeItem("pendingOrder")
              navigate("/orders")
            }
          })
      } else {
        navigate("/collection")
      }
    }
  }, [token])

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmitHandler}>
        <h2>{currentState}</h2>
        <hr />

        {currentState === 'Sign Up' && (
          <div className="signup-grid">
            <input onChange={(e) => setFirstName(e.target.value)} value={firstname} type="text" placeholder="First Name" required />
            <input onChange={(e) => setLastName(e.target.value)} value={lastname} type="text" placeholder="Last Name" required />
            <input onChange={(e) => setStreet(e.target.value)} value={street} type="text" placeholder="Street" required />
            <input onChange={(e) => setCity(e.target.value)} value={city} type="text" placeholder="City" required />
            <input onChange={(e) => setState(e.target.value)} value={state} type="text" placeholder="State" required />
            <input onChange={(e) => setZipcode(e.target.value)} value={zipcode} type="text" placeholder="ZipCode" required />
            <input onChange={(e) => setCountry(e.target.value)} value={country} type="text" placeholder="Country" required />
            <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" placeholder="Phone" required />
          </div>
        )}

        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required />
        <div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"} // ✅ toggle here
            placeholder="Password"
            required
          />
          <span
            
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <div className="form-footer">
          <p className="forgot" onClick={() => navigate("/forgot-password")} >Forgot Your Password?</p>

          {currentState === 'Login' ? (
            <p className="toggle" onClick={() => setCurrentState('Sign Up')}>Create Account</p>
          ) : (
            <p className="toggle" onClick={() => setCurrentState('Login')}>Login Account</p>
          )}
        </div>
        <button type="submit" className="submit-btn">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>

        <div className="google-login">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => toast.error("Google Login Failed")}
            render={(renderProps) => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google-signin-btn">
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
                <h1 className='signgoogle'>Sign in with Google</h1>
              </button>
            )}
          />
        </div>

      </form>
    </div>
  )
}

export default Login
