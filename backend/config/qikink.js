


// import axios from "axios";

// const QIKINK_CLIENT_ID = process.env.QIKINK_CLIENT_ID;
// const QIKINK_CLIENT_SECRET = process.env.QIKINK_CLIENT_SECRET;

// // Sandbox URLs
// const QIKINK_AUTH_URL = "https://sandbox.qikink.com/api/token";
// const QIKINK_ORDER_URL = "https://sandbox.qikink.com/api/order/create";

// /**
//  * Send order to Qikink (Sandbox compatible)
//  * @param {Object} order - Order object with items and address
//  */
// export const sendOrderToQikink = async (order) => {
//   try {
//     // 1️⃣ Get auth token
//     const authRes = await axios.post(
//       QIKINK_AUTH_URL,
//       new URLSearchParams({
//         ClientId: QIKINK_CLIENT_ID,
//         client_secret: QIKINK_CLIENT_SECRET,
//       }),
//       { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//     );

//     const token = authRes?.data?.Accesstoken;
//     if (!token) throw new Error("Qikink access token missing");

//     // 2️⃣ Prepare payload
//     const payload =   {
//     "order_number": "api9",
//     "qikink_shipping": "1",
//     "gateway": "COD",
//     "total_order_value": "1",
//     "line_items": [
//         {
//             "search_from_my_products": 0,
//             "quantity": "1",
//             "price":"1",
//             "print_type_id": "1",
//             "sku": "MVnHs-Wh-XL",
//             "designs": [
//                 {
//                     "design_code": "iPhoneXR",
//                     "width_inches": "",
//                     "height_inches": "",
//                     "placement_sku": "fr",
//                     "design_link":"https://sgp1.digitaloceanspaces.com/cdn.qikink.com/erp2/assets/designs/83/1696668376.jpg",
//                     "mockup_link": "https://sgp1.digitaloceanspaces.com/cdn.qikink.com/erp2/assets/designs/83/1696668376.jpg"
//                 }
//             ]
//         }
//     ],
//     "shipping_address": {
//         "first_name": "sdf",
//         "last_name": "ds",
//         "address1": "sdsfsdf3",
//         "phone":"fasda",
//         "email": "adf",
//         "city":"sda",
//         "zip":"sdfs",
//         "province":"sdfa",
//         "country_code":"IN"
//     }
// }

//     // 3️⃣ Send order
//     const orderRes = await axios.post(QIKINK_ORDER_URL, payload, {
//       headers: {
//         ClientId: QIKINK_CLIENT_ID,
//         Accesstoken: token,
//         "Content-Type": "application/json",
//       },
//     });

//     return orderRes.data;
//   } catch (err) {
//     console.error("Error in sendOrderToQikink:", err.response?.data || err.message);
//     throw err;
//   }
// };

import axios from "axios";

const QIKINK_CLIENT_ID = process.env.QIKINK_CLIENT_ID;
const QIKINK_CLIENT_SECRET = process.env.QIKINK_CLIENT_SECRET;

const QIKINK_AUTH_URL = "https://sandbox.qikink.com/api/token";
const QIKINK_ORDER_URL = "https://sandbox.qikink.com/api/order/create";

/**
 * Send order to Qikink using real data
 * @param {Object} order - full order document from MongoDB
 */
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
        sku: "MStRnHs-Bk-XL",
        designs: [
          {
            width_inches: "",
            height_inches: "",
            design_code: "SUNDAZE" || "DefaultDesign01",
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
