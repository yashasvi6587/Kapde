import { Children, createContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = "₹"
    // const delivery_fee = 1
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')

    const navigate = useNavigate()

    const delivery_fee = 99;




    const addToCart = async (itemId, size, color) => {
        if (!size) return toast.error('Select Product Size');
        if (!color) return toast.error('Select Product Colour');

        let cartData = structuredClone(cartItems);
        if (!cartData[itemId]) cartData[itemId] = {};
        if (!cartData[itemId][size]) cartData[itemId][size] = {};
        cartData[itemId][size][color] = (cartData[itemId][size][color] || 0) + 1;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size, color }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };


    const updateQuantity = async (itemId, size, color, quantity) => {
        let cartData = structuredClone(cartItems);

        if (quantity <= 0) {
            delete cartData[itemId][size][color];
            if (Object.keys(cartData[itemId][size]).length === 0) delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
        } else {
            if (!cartData[itemId]) cartData[itemId] = {};
            if (!cartData[itemId][size]) cartData[itemId][size] = {};
            cartData[itemId][size][color] = quantity;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, color, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };


    const getCartCount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                for (const color in cartItems[itemId][size]) {
                    total += cartItems[itemId][size][color];
                }
            }
        }
        return total;
    };

    const getCartAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const item = products.find(p => p._id === itemId);
            if (!item) continue;
            for (const size in cartItems[itemId]) {
                for (const color in cartItems[itemId][size]) {
                    total += item.price * cartItems[itemId][size][color];
                }
            }
        }
        return total;
    };


    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const loginWithGoogle = async (googleUser) => {
        try {
            const res = await axios.post(backendUrl + "/api/user/google-login", googleUser)
            if (res.data.token) {
                localStorage.setItem("token", res.data.token)
                setToken(res.data.token)
                await getUserCart(res.data.token)
            }
        } catch (error) {
            console.error("Google login error:", error)
            toast.error(error.message)
        }
    }


    const value = {
        products, currency, delivery_fee,
        search, setSearch, setShowSearch, showSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate,
        backendUrl,
        setToken, token, getUserCart,
        loginWithGoogle
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider