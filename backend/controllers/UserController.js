import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { sendResetEmail } from "../utils/email.js";
import jwt from "jsonwebtoken"
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, msg: "User doesn't exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
// Route for user reigster
const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password, street, city, state, zipcode, phone, country } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, msg: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, msg: "Please enter a valid email" });
        }

        // const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        // if (password && !strongPasswordRegex.test(password)) {
        //     return res.json({
        //         success: false,
        //         msg: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
        //     });
        // }



        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            date: Date.now(),
            street,
            zipcode,
            phone,
            state,
            city,
            country
            ,
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// getUserDetails
const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ auth middleware se aaya
    const user = await userModel.findById(userId).select("-password -cartData");
    if (!user) return res.json({ success: false, msg: "User not found" });

    // ✅ Always return safe defaults (empty strings) so frontend me boxes prefilled ayenge
    res.json({
      success: true,
      data: {
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        street: user.street || "",
        city: user.city || "",
        state: user.state || "",
        zipcode: user.zipcode || "",
        phone: user.phone || "",
        country: user.country || ""
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};




// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const googleLogin = async (req, res) => {
    try {
        const { email, firstname, lastname, googleId } = req.body;

        let user = await userModel.findOne({ email });

        if (!user) {
            user = new userModel({ firstname, lastname, email, googleId, password: null });
            await user.save();
        } else if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
        }


        // JWT token generate kar le
        const token = createToken(user._id);
        res.json({ success: true, token, user });

    } catch (error) {
        res.status(500).json({ message: "Google login failed", error });
    }
};

// controllers/userController.js
const updateUserDetails = async (req, res) => {
    try {
        const userId = req.user.id   // auth middleware se
        const { street, city, state, zipcode, phone, country } = req.body

        const updated = await userModel.findByIdAndUpdate(
            userId,
            { street, city, state, zipcode, phone, country },
            { new: true }
        ).select("-password -cartData")

        res.json({ success: true, data: updated })
    } catch (error) {
        console.log(error)
        res.json({ success: false, msg: error.message })
    }
}




// POST /api/user/forgot-password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, msg: "Email required" });

    const user = await userModel.findOne({ email });
    // Always respond with same message to avoid user enumeration
    if (!user) {
      return res.json({ success: true, msg: "If account exists, reset link has been sent." });
    }

    // generate token (plain) and store hashed version in DB
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const expires = Date.now() + 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = expires;
    await user.save();

    // build reset URL (frontend route)
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await sendResetEmail({ to: email, resetUrl });

    return res.json({ success: true, msg: "If account exists, reset link has been sent." });
  } catch (err) {
    console.error("forgotPassword error:", err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

// POST /api/user/reset-password
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ success: false, msg: "Token and password required" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ success: false, msg: "Invalid or expired token" });

    // validate password strength as you like (optional)
    // hash and save
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    // Optionally auto-login: create jwt and return to frontend
    const authToken = createToken(user._id);
    res.json({ success: true, token: authToken, msg: "Password reset successful" });
  } catch (err) {
    console.error("resetPassword error:", err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};



export { loginUser, registerUser, adminLogin, getUserDetails, googleLogin, updateUserDetails , forgotPassword, resetPassword}