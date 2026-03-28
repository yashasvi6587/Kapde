import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    cutprice: { type: Number, required: true },
    star: { type: Number, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean },
    date: { type: Number, required: true },
    mockup_link: { type: String }, // first image for Qikink
    design_link: { type: String },
    sku: { type: String}, // e.g. "MStRnHs-Bk"
    width_inches: {type: Number, required: true},
    height_inches: {type: Number, required: true},


})

const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel
