import express from "express"
import { loginUser, registerUser, adminLogin, getUserDetails, googleLogin, updateUserDetails,forgotPassword,resetPassword } from "../controllers/UserController.js";
import authUser from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

// ✅ Ye route add/rename karo:
userRouter.get("/details", authUser, getUserDetails);

userRouter.post("/google-login", googleLogin);
userRouter.post("/update", authUser, updateUserDetails);

userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
