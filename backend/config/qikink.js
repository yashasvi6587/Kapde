// import axios from "axios";

// const QIKINK_CLIENT_ID = process.env.QIKINK_CLIENT_ID;
// const QIKINK_CLIENT_SECRET = process.env.QIKINK_CLIENT_SECRET;

// // Main Qikink API base (auth token ke liye fix)
// const QIKINK_AUTH_URL = "https://sandbox.qikink.com/api/token";
// const QIKINK_ORDER_URL = "https://sandbox.qikink.com/api/order/create";

// /**
//  * Send order to Qikink
//  */
// export const sendOrderToQikink = async (order) => {
//     try {
//         // 1️⃣ Auth Token banana
//         const authRes = await axios.post(
//             QIKINK_AUTH_URL,
//             new URLSearchParams({
//                 ClientId: QIKINK_CLIENT_ID,
//                 client_secret: QIKINK_CLIENT_SECRET,
//             }),
//             {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//             }
//         );

//         const token = authRes?.data?.Accesstoken;
//         if (!token) throw new Error("Qikink access token missing");

//         // 2️⃣ Payload banana
//         const payload = {
//             order_number: order._id.toString().slice(-12),
//             qikink_shipping: 1,
//             gateway: order.paymentMethod === "COD" ? "COD" : "Prepaid",
//             total_order_value: order.amount,
//             line_items: order.items.map(item => ({
//                 search_from_my_products: 0,
//                 quantity: item.quantity || 1,
//                 price: item.price || 0,
//                 print_type_id: item.print_type_id || 1,
//                 sku: item.sku || item._id || "SKU123",
//                 designs: [
//                     {

//                         width_inches: item.width_inches || "",
//                         height_inches: item.height_inches || "",
//                         mockup_link: item.mockup_link || imagesUrl[0] || "",
//                         design_link: item.design_link || "DefaultDesign01",

//                         placement_sku: item.placement_sku || "fr",
//                     }
//                 ]
//             })),
//             shipping_address: {
//                 first_name: order.address.firstName,
//                 last_name: order.address.lastName || "",
//                 address1: order.address.street,
//                 phone: order.address.phone,
//                 email: order.address.email,
//                 city: order.address.city,
//                 zip: order.address.zipCode,
//                 province: order.address.state,
//                 country_code: order.address.country || "IN"
//             }
//         };



//         // 3️⃣ Order create karna
//         const orderRes = await axios.post(QIKINK_ORDER_URL, payload, {
//             headers: {
//                 ClientId: QIKINK_CLIENT_ID,
//                 Accesstoken: token,
//                 "Content-Type": "application/json"
//             }
//         });


//         return orderRes.data;
//     } catch (err) {
//         console.error(
//             "Error in sendOrderToQikink:",
//             err.response?.data || err.message
//         );
//         throw err;
//     }
// };



import axios from "axios";

const QIKINK_CLIENT_ID = process.env.QIKINK_CLIENT_ID;
const QIKINK_CLIENT_SECRET = process.env.QIKINK_CLIENT_SECRET;

// Sandbox URLs
const QIKINK_AUTH_URL = "https://sandbox.qikink.com/api/token";
const QIKINK_ORDER_URL = "https://sandbox.qikink.com/api/order/create";

/**
 * Send order to Qikink (Sandbox compatible)
 * @param {Object} order - Order object with items and address
 */
export const sendOrderToQikink = async (order) => {
  try {
    // 1️⃣ Get auth token
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

    // 2️⃣ Prepare payload
    const payload =   {
    "order_number": "api9",
    "qikink_shipping": "1",
    "gateway": "COD",
    "total_order_value": "1",
    "line_items": [
        {
            "search_from_my_products": 0,
            "quantity": "1",
            "price":"1",
            "print_type_id": "1",
            "sku": "MVnHs-Wh-XL",
            "designs": [
                {
                    "design_code": "iPhoneXR",
                    "width_inches": "",
                    "height_inches": "",
                    "placement_sku": "fr",
                    "design_link":"https://sgp1.digitaloceanspaces.com/cdn.qikink.com/erp2/assets/designs/83/1696668376.jpg",
                    "mockup_link": "https://sgp1.digitaloceanspaces.com/cdn.qikink.com/erp2/assets/designs/83/1696668376.jpg"
                }
            ]
        }
    ],
    "shipping_address": {
        "first_name": "sdf",
        "last_name": "ds",
        "address1": "sdsfsdf3",
        "phone":"fasda",
        "email": "adf",
        "city":"sda",
        "zip":"sdfs",
        "province":"sdfa",
        "country_code":"IN"
    }
}

    // 3️⃣ Send order
    const orderRes = await axios.post(QIKINK_ORDER_URL, payload, {
      headers: {
        ClientId: QIKINK_CLIENT_ID,
        Accesstoken: token,
        "Content-Type": "application/json",
      },
    });

    return orderRes.data;
  } catch (err) {
    console.error("Error in sendOrderToQikink:", err.response?.data || err.message);
    throw err;
  }
};
