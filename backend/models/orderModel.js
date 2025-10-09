import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: {
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
  },
  status: { type: String, required: true, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },
  shipment: {
    provider: { type: String },
    providerOrderId: { type: String },
    awb: { type: String },
    labelUrl: { type: String },
    trackingUrl: { type: String },
    status: { type: String },
    shippingCost: { type: Number },
    rawResponse: { type: Object },
    createdAt: { type: Number },
    updatedAt: { type: Number },
  }
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
