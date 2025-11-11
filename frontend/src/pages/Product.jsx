import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import '../Styles/Product.css'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart, navigate } = useContext(ShopContext)

  const [productData, setProductData] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [size, setSize] = useState('')

  useEffect(() => {
    const foundProduct = products.find(p => p._id === productId)
    if (foundProduct) {
      setProductData(foundProduct)
      setSelectedImage(foundProduct.image[0]) // default black image
    }
    window.scrollTo(0, 0)
  }, [productId, products])

  // 🔹 Automatically change main image based on color selection


  const calculateDiscount = (price, cutprice) => {
    if (!cutprice || cutprice <= price) return 0
    return Math.round(((cutprice - price) / cutprice) * 100)
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const stars = []
    for (let i = 0; i < 10; i += 2) {
      stars.push(
        <img
          key={i}
          src={i < fullStars ? assets.star_icon : assets.star_dull_icon}
          alt="star"
        />
      )
    }
    return stars
  }

  return productData ? (
    <motion.div
      className="product-page premium-gradient"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="breadcrumb">
        All Collections › {productData.category} › {productData.name}
      </div>

      <div className="product-layout">
        {/* Left Section - Images */}
        <div className="product-images">
          <div className="thumbnail-list">
            {productData.image.map((img, i) => (
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={i}
                src={img}
                alt="thumb"
                className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          <div className="main-image">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt={productData.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Right Section - Info */}
        <motion.div
          className="product-info"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1>{productData.name}</h1>
          <div className="description-section">
            <p>{productData.description}</p>
          </div>

          <div className="rating">
            {renderStars(productData.rating)}
            <span className="review-text">{productData.rating} Ratings</span>
          </div>

          <div className="price-section">
            <p className="current-price">
              {currency}{productData.price}
            </p>
            <p className="old-price">{currency}{productData.cutprice}</p>
            {productData.cutprice > productData.price && (
              <p className="discount">
                {calculateDiscount(productData.price, productData.cutprice)}% OFF
              </p>
            )}
          </div>


        

          {/* --- SIZES --- */}
          <div className="size-section">
            <p className="bold">Select Size:</p>
            <div className="size-options">
              {productData.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={size === s ? 'active' : ''}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* --- ACTIONS --- */}
          <div className="actions">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#000' }}
              whileTap={{ scale: 0.97 }}
              className="add-cart"
              onClick={() => {
                if (!size) return toast.error('Please select a size.')
                addToCart(productData._id, size)
                navigate('/cart')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              ADD TO CART
            </motion.button>
          </div>

          <div className="policies">
            <p><strong>✓</strong> 100% Original Product</p>
            <p><strong>✓</strong> Cash on Delivery Available</p>
            <p><strong>✓</strong> Easy Return & Exchange within 7 Days</p>
          </div>
        </motion.div>
      </div>

      <div className="extra-section">
        <h2>{productData.category} › {productData.name}</h2>
        <p>
          Stay cozy and stylish with our selection of premium apparel — crafted for comfort, designed for confidence.
        </p>
      </div>

      <RelatedProducts category={productData.category} />
    </motion.div>
  ) : (
    <div className="product-container">Loading...</div>
  )
}

export default Product
