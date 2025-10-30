import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import '../Styles/Product.css'
import { toast } from 'react-toastify'

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
      setSelectedImage(foundProduct.image[0])
    }
    window.scrollTo(0, 0)
  }, [productId, products])

  const calculateDiscount = (price, cutprice) => {
    if (!cutprice || cutprice <= price) return 0
    return Math.round(((cutprice - price) / cutprice) * 100)
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const stars = []
    for (let i = 0; i < 10; i=i+2) {
      if (i < fullStars) stars.push(<img key={i} src={assets.star_icon} alt="star" />)
      else stars.push(<img key={i} src={assets.star_dull_icon} alt="star" />)
    }
    return stars
  }

  return productData ? (
    <div className="product-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        All Collections › {productData.category} › {productData.name}
      </div>

      <div className="product-layout">
        {/* LEFT : Images */}
        <div className="product-images">
          <div className="thumbnail-list">
            {productData.image.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                className={`thumbnail ${selectedImage === img ? "active" : ""}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          <div className="main-image">
            <img src={selectedImage} alt={productData.name} />
          </div>
        </div>

        {/* RIGHT : Info */}
        <div className="product-info">
          <h1>{productData.name}</h1>
          {productData.description && (
            <div className="description-section">
              <p>{productData.description}</p>
            </div>
          )}

          <div className="rating">
            {renderStars(productData.rating)}
            <span className="review-text">{productData.rating} Ratings</span>
          </div>

          <div className="price-section">
            <p className="current-price">{currency}{productData.price}</p>
            <p className="old-price">{currency}{productData.cutprice}</p>
            {productData.cutprice > productData.price && (
              <p className="discount">{calculateDiscount(productData.price, productData.cutprice)}% OFF</p>
            )}
          </div>

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

          <div className="actions">
            <button className='add-cart'
              onClick={() => {
                if (!size) {
                  toast.error('Please select a size.');
                  return;
                }
                addToCart(productData._id, size);
                navigate('/cart');
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              ADD TO CART
            </button>
          </div>

          <div className="policies">
            <p><strong>✓</strong> 100% Original Product</p>
            <p><strong>✓</strong> Cash on Delivery Available</p>
            <p><strong>✓</strong> Easy Return & Exchange within 7 Days</p>
          </div>
          

        </div>
      </div>

      {/* Extra Section */}
      <div className="extra-section">
        <h2>All Collections › {productData.category} › {productData.name}</h2>
        <p>
          Stay cozy and stylish with our selection of amazing clothes! From
          classic trenches to warm parkas, we’ve got you covered in every season.
        </p>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div className="product-container">Loading...</div>
  )
}

export default Product
