import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import '../Styles/BestSeler.css'

const BestSeler = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const bestProduct = products.filter(item => item.bestseller)
    setBestSeller(bestProduct.slice(0, 10))
  }, [products])

  return (
    <section className="bestseller-section">
      {/* Title Section */}
      <div className="bestseller-header">
        <Title text1="BEST" text2="SELLERS" />
        <p className="bestseller-description">
          Our hottest picks just for you. Discover top-selling gems that define the season's style.
        </p>
      </div>

      {/* Product Grid */}
      <div className="bestseller-grid">
        {bestSeller.length > 0 ? (
          bestSeller.map((item) => (
            <div className="product-wrapper" key={item._id}>
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                cutprice={item.cutprice}
                description={item.description}
                star={item.star}
                rating={item.rating}
              />
            </div>
          ))
        ) : (
          <div className="loading">
            <p className="loading-text">
              Loading<span className="dots"></span>
            </p>
          </div>
        )}
      </div>

    </section>
  )
}

export default BestSeler
