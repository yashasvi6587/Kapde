import express from "express"

import { allOrders,placeOrder,placeOrderRazorpay,updateStatus,userOrders,verifyRazorpay,placeGuestOrder,createShipment,shipmentWebhook } from "../controllers/orderController.js"
import adminAuth from "../middlewares/adminAuth.js"
import authUser from "../middlewares/auth.js"
const orderRouter=express.Router()

// Admin Features 
orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStatus)

// Payment Features 
orderRouter.post("/place",authUser,placeOrder)
// orderRouter.post("/stripe",authUser,placeOrderStripe)
orderRouter.post("/razorpay",authUser,placeOrderRazorpay)

// USer Feature 
orderRouter.post("/userorders",authUser,userOrders)

// verify payment 
// orderRouter.post("/verifyStripe",authUser,verifyStripe)
orderRouter.post("/verifyRazorpay",authUser,verifyRazorpay)

// Guest Order (without login)
orderRouter.post("/guest", placeGuestOrder);

// backend/routes/orderRoute.js
orderRouter.post('/shipment/:orderId', adminAuth, createShipment);
orderRouter.post('/shipment/webhook', shipmentWebhook); // public endpoint for provider webhooks


export default orderRouter