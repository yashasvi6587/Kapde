

import axios from "axios";

const QIKINK_CLIENT_ID = process.env.QIKINK_CLIENT_ID;
const QIKINK_CLIENT_SECRET = process.env.QIKINK_CLIENT_SECRET;

const QIKINK_AUTH_URL = "https://api.qikink.com/api/token";
const QIKINK_ORDER_URL = "https://api.qikink.com/api/order/create";

/**
 * Send order to Qikink using real data
 * @param {Object} order - full order document from MongoDB
 * 
 * 
 */

// const getToken = async () => {
//   try {
//     const res = await axios.post(
//       QIKINK_AUTH_URL,

//       new URLSearchParams({
//         ClientId: process.env.QIKINK_CLIENT_ID,
//         client_secret: process.env.QIKINK_CLIENT_SECRET,
//       }),
//       { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//     );
//     console.log(res.data);
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//   }
// };

// getToken();



export const sendOrderToQikink = async (order) => {
  try {
    // Step 1️⃣: Authenticate with Qikink
    const authRes = await axios.post(
      QIKINK_AUTH_URL,
      new URLSearchParams({
        ClientId: QIKINK_CLIENT_ID,
        client_secret: QIKINK_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const token = authRes?.data?.Accesstoken;
    if (!token) throw new Error("Qikink access token missing");

    // Step 2️⃣: Build payload dynamically from order
    const payload = {
      order_number: order._id.toString().slice(-10),
      qikink_shipping: "1",
      gateway: order.paymentMethod?.toUpperCase() || "COD",
      total_order_value: String(order.amount),
      line_items: order.items.map((item) => ({
        search_from_my_products: 0,
        quantity: String(item.quantity || 1),
        price: String(item.price || order.amount || 0),
        print_type_id: "1",
        sku: item.sku || "DefaultSKU",
        designs: [
          {
            width_inches: item.width_inches,
            height_inches: item.height_inches,
            design_code: "Design",
            placement_sku: item.placement_sku || "fr",
            design_link: item.design_link || "",
            mockup_link: item.mockup_link || "",
          },
        ],
      })),
      shipping_address: {
        first_name: order.address.firstName || "",
        last_name: order.address.lastName || "",
        address1: order.address.street || "",
        phone: order.address.phone || "",
        email: order.address.email || "",
        city: order.address.city || "",
        zip: order.address.zipCode || "",
        province: order.address.state || "",
        country_code: "IN",
      },
    };

    // Step 3️⃣: Send order to Qikink
    const orderRes = await axios.post(QIKINK_ORDER_URL, payload, {
      headers: {
        ClientId: QIKINK_CLIENT_ID,
        Accesstoken: token,
        "Content-Type": "application/json",
      },
    });

    console.log("Qikink Response:", orderRes.data);
    return orderRes.data;
  } catch (err) {
    console.error("Error in sendOrderToQikink:", err.response?.data || err.message);
    throw err;
  }
};
