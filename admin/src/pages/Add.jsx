import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "../Styles/Add.css";
import { useLocation } from "react-router-dom";

const Add = ({ token }) => {
  const location = useLocation();
  const product = location.state?.product;

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(product ? product.description : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [cutprice, setCutprice] = useState(product ? product.cutprice : "");
  const [star, setStar] = useState(product ? product.star : "");
  const [rating, setRating] = useState(product ? product.rating : "");
  const [category, setCatgeory] = useState(product ? product.category : "White");
  const [subCategory, setSubCategory] = useState(product ? product.subCategory : "Feelings");
  const [bestseller, setBestseller] = useState(product ? product.bestseller : false);
  const [sizes, setSizes] = useState(product ? product.sizes : []);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("cutprice", cutprice);
      formData.append("star", star);
      formData.append("rating", rating);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      let response;
      if (product) {
        formData.append("id", product._id);
        response = await axios.post(backendUrl + "/api/product/update", formData, {
          headers: { token },
        });
      } else {
        response = await axios.post(backendUrl + "/api/product/add", formData, {
          headers: { token },
        });
      }

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="add-product-form">
      <h2>{product ? "✏️ Update Product" : "➕ Add New Product"}</h2>

      {/* Image Upload Section */}
      <div className="upload-section">
        <p>Upload Images</p>
        <div className="image-upload-grid">
          {[image1, image2, image3, image4].map((img, i) => (
            <label htmlFor={`image${i + 1}`} key={i}>
              <img src={!img ? assets.upload_area : URL.createObjectURL(img)} alt="" />
              <input
                onChange={(e) => {
                  const setter = [setImage1, setImage2, setImage3, setImage4][i];
                  setter(e.target.files[0]);
                }}
                type="file"
                id={`image${i + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Text Fields */}
      <div className="text-input">
        <p>Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
          placeholder="Type Here"
        />
      </div>

      <div className="text-input">
        <p>Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Type Here"
        />
      </div>

      {/* Category & Pricing Section */}
      <div className="selectors">
        <div>
          <p>Category</p>
          <select onChange={(e) => setCatgeory(e.target.value)} value={category}>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Coloured">Coloured</option>
            {/* <option value="Full Sleeves">Full Sleeves</option> */}
          </select>
        </div>

        <div>
          <p>Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory}>
            <option value="Feelings">Feelings</option>
            <option value="Plain">Plain</option>
            <option value="Casual">Casual</option>
          </select>
        </div>
      </div>

      {/* Price Section */}
      <div className="price-grid">
        <div>
          <p>Price (INR)</p>
          <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="₹ Price" />
        </div>
        <div>
          <p>Cut Price (INR)</p>
          <input value={cutprice} onChange={(e) => setCutprice(e.target.value)} type="number" placeholder="₹ Cut Price" />
        </div>
        <div>
          <p>Star ⭐</p>
          <input value={star} onChange={(e) => setStar(e.target.value)} type="number" min="0" max="10" step="0.1" placeholder="4.5" />
        </div>
        <div>
          <p>Rating Count</p>
          <input value={rating} onChange={(e) => setRating(e.target.value)} type="number" placeholder="e.g. 120" />
        </div>
      </div>

      {/* Size Section */}
      <div className="size-selection">
        <p>Available Sizes</p>
        {["S", "M", "L", "XL", "XXL"].map((size, index) => (
          <div
            onClick={() => toggleSize(size)}
            key={index}
            className={sizes.includes(size) ? "selected" : ""}
          >
            <p>{size}</p>
          </div>
        ))}
      </div>

      {/* Bestseller Checkbox */}
      <div className="checkbox-field">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label htmlFor="bestseller">Add To BestSeller</label>
      </div>

      {/* Submit */}
      <button type="submit" className="submit-button">
        {product ? "UPDATE PRODUCT" : "ADD PRODUCT"}
      </button>
    </form>
  );
};

export default Add;
