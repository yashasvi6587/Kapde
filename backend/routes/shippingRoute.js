import express from "express";
import axios from "axios";
import shiprocketService from "../services/shipping/shiprocketService.js";

const router = express.Router();

router.post("/rate", async (req, res) => {
  try {
    const { pickup_postcode, delivery_postcode, weight = 1 } = req.body;
    const token = await shiprocketService.auth();

    // 🔹 Shiprocket API GET method use karta hai
    const url = `${process.env.SHIPROCKET_BASE_URL}/courier/serviceability/?pickup_postcode=${pickup_postcode}&delivery_postcode=${delivery_postcode}&weight=${weight}&cod=0`;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const available = response.data.data.available_courier_companies;
    if (!available || available.length === 0)
      return res.json({ success: false, message: "No courier available" });

    const cheapest = available.reduce((a, b) => (a.rate < b.rate ? a : b));

    res.json({
      success: true,
      rate: cheapest.rate,
      courier_name: cheapest.courier_name,
      estimated_delivery_days: cheapest.estimated_delivery_days,
    });
  } catch (err) {
    console.error("Error fetching Shiprocket rate:", err.response?.data || err.message);
    res.json({ success: false, message: "Failed to fetch rate" });
  }
});

export default router;
