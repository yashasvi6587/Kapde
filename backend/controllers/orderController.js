import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import razorpay from "razorpay";
import shiprocketService from "../services/shipping/shiprocketService.js";
import { mapOrderToShiprocket } from "../utils/shiprocketMapper.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const currency = "inr";
const deliveryCharge = 10;

// ✅ COD Order
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.user.id;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed", order: newOrder });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Create Razorpay Order
const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: "rcpt_" + Date.now(),
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Verify Razorpay Payment
const verifyRazorpay = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      amount,
      address,
    } = req.body;

    const userId = req.user.id;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod: "Razorpay",
        payment: true,
        date: Date.now(),
      };

      const newOrder = new orderModel(orderData);
      await newOrder.save();

      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({
        success: true,
        message: "Payment Successful",
        order: newOrder,
      });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Guest Order (without login)
const placeGuestOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipCode,
      phone,
      country,
      items,
      amount,
    } = req.body;

    const orderData = {
      userId: null,
      items,
      address: {
        firstName,
        lastName,
        email,
        street,
        city,
        state,
        zipCode,
        phone,
        country,
      },
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    res.json({ success: true, order: newOrder });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Shipment Creation
const createShipment = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ success: false, msg: "Order not found" });

    const providerPayload = mapOrderToShiprocket(order);
    const response = await shiprocketService.createOrder(providerPayload);

    order.shipment = {
      provider: "shiprocket",
      providerOrderId: response.shipment_id,
      awb: response.awb_code,
      labelUrl: response.label_url,
      trackingUrl: response.tracking_url,
      status: response.status || "created",
      shippingCost: response.shipping_charges || 0,
      rawResponse: response,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await order.save();

    res.json({ success: true, order });
  } catch (err) {
    console.error("createShipment:", err.response?.data || err.message);
    res.status(500).json({ success: false, msg: "Shipment creation failed" });
  }
};

// ✅ Webhook for Shipment
const shipmentWebhook = async (req, res) => {
  try {
    const payload = req.body;
    const providerOrderId = payload.order_id || payload.shipment_id;
    const awb = payload.awb || payload.awb_number;
    const status = payload.current_status || payload.status || payload.event;

    const order = await orderModel.findOne({
      $or: [{ "shipment.providerOrderId": providerOrderId }, { "shipment.awb": awb }],
    });

    if (order) {
      order.shipment.status = status;
      if (payload.tracking_url) {
        order.shipment.trackingUrl = payload.tracking_url;
      }
      order.shipment.updatedAt = Date.now();

      if (status?.toLowerCase() === "delivered") {
        order.status = "Delivered";
      }

      await order.save();
    }

    res.json({ success: true });
  } catch (err) {
    console.error("webhook error:", err);
    res.status(500).json({ success: false });
  }
};

// ✅ All Orders
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ User Orders
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Update Status (Admin)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  verifyRazorpay,
  placeOrder,
  placeOrderRazorpay,
  allOrders,
  updateStatus,
  userOrders,
  placeGuestOrder,
  createShipment,
  shipmentWebhook,
};
