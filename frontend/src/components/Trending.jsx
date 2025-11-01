import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import "../Styles/Trending.css";
import React from "react";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

export default function Trending() {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(11, 15));
  }, [products]);

  return (
    <section className="trending-wrapper">
      {/* Heading */}
      <motion.h2
        className="trending-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        🔥 TRENDING
      </motion.h2>

      {/* Description */}
      <motion.div
        className="trending-header"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="trending-desc">
          Inspired by energy, purpose, and presence — each piece is a reminder to wear your truth with devotion.
        </p>
      </motion.div>

      {/* Product Grid */}
      <motion.div
        className="trending-grid"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <motion.div
              key={item._id}
              className="trending-item"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
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
              <motion.div
                className="trending-badge"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                🔥 Trending
              </motion.div>
            </motion.div>
          ))
        ) : (
          <div className="loading">
            <p className="loading-text">
              Loading<span className="dots"></span>
            </p>
          </div>
        )}
      </motion.div>

    </section>
  );
}
