import userModel from "../models/userModel.js"

// add products to user cart
// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, size, color } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};
    if (!cartData[itemId][size]) cartData[itemId][size] = {};
    cartData[itemId][size][color] = (cartData[itemId][size][color] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// UPDATE CART
const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, size, color, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};
    if (!cartData[itemId][size]) cartData[itemId][size] = {};
    cartData[itemId][size][color] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// GET USER CART
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, getUserCart, updateCart };
