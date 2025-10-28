import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import '../Styles/Collection.css';
import { useLocation } from 'react-router-dom';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');
  const location = useLocation();

  const togglecategory = (e) => {
    const value = e.target.value;
    setCategory(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const togglesubcategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const applyfilters = () => {
    let productscopy = Array.isArray(products) ? [...products] : [];
    if (showSearch && search) {
      productscopy = productscopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      productscopy = productscopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productscopy = productscopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProducts(productscopy);
  };

  const sortproduct = (list = filterProducts) => {
    const copy = [...list];
    switch (sortType) {
      case 'low-high':
        return copy.sort((a, b) => a.price - b.price);
      case 'high-low':
        return copy.sort((a, b) => b.price - a.price);
      default:
        return copy;
    }
  };

  useEffect(() => {
    applyfilters();
    // eslint-disable-next-line
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    setFilterProducts(prev => sortproduct(prev));
    // eslint-disable-next-line
  }, [sortType]);

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const categoryParam = params.get('category');
  const subCategoryParam = params.get('subCategory');

  if (categoryParam) setCategory([categoryParam]);
  if (subCategoryParam) setSubCategory([subCategoryParam]);
  // eslint-disable-next-line
}, [location.search]);


  return (
    <div className="collection-wrapper">
      <aside className="filter-sidebar">
        <h3>Filter</h3>

        <div className="filter-section">
          <p>Type</p>
          {['White', 'Black', 'Coloured'].map((cat, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={cat}
                onChange={togglecategory}
                checked={category.includes(cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <p>Categories</p>
          {['Feelings', 'Plain', 'Casual'].map((type, index) => (
            <label key={index}>
              <input
                type="checkbox"
                value={type}
                onChange={togglesubcategory}
                checked={subCategory.includes(type)}
              />
              {type}
            </label>
          ))}
        </div>
      </aside>

      <main className="products-section">
        <div className="products-header">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select onChange={(e) => setSortType(e.target.value)} value={sortType} className="sort-select">
            <option value="relavent">Sort By: Relevance</option>
            <option value="low-high">Sort By: Low - High</option>
            <option value="high-low">Sort By: High - Low</option>
          </select>
        </div>

        <div className="products-grid">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <div key={index} className="product-card fade-in">
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
            <div className="no-products">
              <p>No products found 😔</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Collection;
