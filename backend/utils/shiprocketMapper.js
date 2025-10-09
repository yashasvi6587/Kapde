// backend/utils/shiprocketMapper.js
export function mapOrderToShiprocket(order) {
  return {
    order_id: order._id.toString(),
    order_date: new Date(order.date).toISOString(),
    pickup_location: "Primary", // Shiprocket dashboard me define karna padega
    channel_id: "",
    comment: "Order via Website",

    billing_customer_name: order.address.firstName || "Guest",
    billing_last_name: order.address.lastName || "",
    billing_address: order.address.street,
    billing_city: order.address.city,
    billing_pincode: order.address.zipCode,
    billing_state: order.address.state,
    billing_country: order.address.country,
    billing_email: order.address.email,
    billing_phone: order.address.phone,

    shipping_is_billing: true,

    order_items: order.items.map(i => ({
      name: i.name,
      sku: i.sku || i._id?.toString() || "NA",
      units: i.quantity,
      selling_price: i.price,
    })),

    payment_method: order.paymentMethod === "COD" ? "COD" : "Prepaid",
    sub_total: order.amount,
    length: 10,
    breadth: 10,
    height: 10,
    weight: 1
  };
}
