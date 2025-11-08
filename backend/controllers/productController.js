import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"

// function for add product

// ADD PRODUCT
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller, cutprice, star, rating, design_link, mockup_link } = req.body;

        // images from multer
        const images = ['image1','image2','image3','image4'].map(f => req.files[f]?.[0]).filter(i => i);

        // upload to cloudinary
        const imagesUrl = await Promise.all(images.map(item => cloudinary.uploader.upload(item.path, { resource_type:'image' }).then(r => r.secure_url)));

        if (!imagesUrl[0]) return res.json({ success:false, message:"First image required for Qikink" });

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true',
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
            cutprice: Number(cutprice),
            star: Number(star),
            rating: Number(rating),

            // Qikink required
            mockup_link:mockup_link || imagesUrl[0] || "",
            design_link: design_link || "DefaultDesign01"
        };

        const product = new productModel(productData);
        await product.save();
        res.json({ success:true, message:"Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success:false, message:error.message });
    }
}

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, subCategory, sizes, bestseller, cutprice, star, rating, design_link } = req.body;

        let updateData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true',
            sizes: JSON.parse(sizes),
            cutprice: Number(cutprice),
            star: Number(star),
            rating: Number(rating),
            design_code: design_link || "DefaultDesign01",
        };

        const images = ['image1','image2','image3','image4'].map(f => req.files[f]?.[0]).filter(i => i);

        if (images.length > 0) {
            const imagesUrl = await Promise.all(images.map(item => cloudinary.uploader.upload(item.path, { resource_type:'image' }).then(r => r.secure_url)));
            updateData.image = imagesUrl;
            updateData.mockup_link = imagesUrl[0]; // first image for Qikink
        }

        await productModel.findByIdAndUpdate(id, updateData);
        res.json({ success:true, message:"Product Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success:false, message:error.message });
    }
}


// function for list product
const listProducts=async(req,res)=>{
    try {
        const products=await productModel.find({})
        res.json({success:true,products})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
// function for removing product
const removeProduct=async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
// function for single product info
const singleProduct=async(req,res)=>{
    try {
        const {productId}=req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
         console.log(error);
        res.json({success:false,message:error.message})
    }
}

// function for update product



export {addProduct,listProducts,removeProduct,singleProduct,updateProduct}