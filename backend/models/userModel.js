import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // ab optional ho gaya
    date: { type: Number },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },

    // 🆕 Added fields
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    phone: { type: String },
    country: { type: String },
    // backend/models/userModel.js (add these fields)
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Number },


    cartData: { type: Object, default: {} },
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
