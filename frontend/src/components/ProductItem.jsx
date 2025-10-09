import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'

const ProductItem = ({ id, image, name, price, description, cutprice, star, rating }) => {
  const { currency } = useContext(ShopContext)

  const discountPercent = cutprice
    ? Math.round(((cutprice - price) / cutprice) * 100)
    : 0

  return (
    <Link
      to={`/product/${id}`}
      className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-black"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Product Info */}
      <div className="p-10 space-y-8">
        {/* Name */}
        <p className="text-xl font-semibold text-white truncate text-center">{name}</p>
        <p className="text-red-500 text-center">({discountPercent}% Off)</p>

        {/* Description */}
        {description && (
          <p className="text-gray-100 text-sm line-clamp-2 text-center">{description}</p>
        )}

        {/* Star & Rating */}
        <div className="flex items-center justify-center gap-10">
          <p className="text-yellow-300 font-semibold flex items-center">
            {star} <AiFillStar className="inline ml-1" />
          </p>
          <p className="text-gray-100 text-sm">({rating} reviews)</p>
        </div>

        {/* Price & Cutprice */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <p className="text-xl font-semibold text-white">{currency} {price}/-</p>
          {cutprice && (
            <>
              <p className="text-gray-100 line-through">{currency} {cutprice}/-</p>
              
            </>
          )}
        </div>

        {/* Hover underline animation */}
        <div className="h-1 bg-gradient-to-r from-gray-600 via-gray-900 to-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
      </div>
    </Link>
  )
}

export default ProductItem
