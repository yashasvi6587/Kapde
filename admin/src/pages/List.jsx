import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import '../Styles/List.css'
import { useNavigate } from "react-router-dom"

const List = ({ token }) => {
  const [list, setList] = useState([])
  const navigate = useNavigate()   // ⬅️ hook use kiya

  const editProduct = (product) => {
    // product ka data navigate ke state me bhej denge
    navigate("/add", { state: { product } })
  }

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="list-container">
      <h2 className="list-title">All Products List</h2>
      <div className="list-header">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {
        list.map((item, index) => (
          <div className="list-item" key={index}>
            <img src={item.image[0]} alt="" className="product-img" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>

            {/* ✅ Action buttons container */}
            <div className="product-actions">
              <button className="action-btn remove-btn" onClick={() => removeProduct(item._id)}>Remove</button>
              <button className="action-btn edit-btn" onClick={() => editProduct(item)}>Edit</button>
            </div>
          </div>

        ))
      }
    </div>
  )
}

export default List
