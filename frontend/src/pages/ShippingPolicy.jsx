import React from "react";
import "../Styles/ShippingPolicy.css"; // adjust path if needed

const ShippingPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Shipping & Delivery Policy</h1>
      <p className="updated-date">Last updated on Nov 10, 2025</p>

      <p>
        For international buyers, orders are shipped and delivered through registered international
        courier companies and/or international speed post only. For domestic buyers, orders are shipped
        through registered domestic courier companies and/or speed post only.
      </p>

      <p>
        Orders are shipped within <strong>0–7 days</strong> or as per the delivery date agreed at the
        time of order confirmation, subject to courier or postal service norms.
      </p>

      <p>
        <strong>VAIBHAV SHARMA</strong> is not liable for any delay in delivery by the courier or postal
        authorities and only guarantees to hand over the consignment to them within 0–7 days from the
        date of order and payment, or as per the agreed delivery schedule.
      </p>

      <p>
        Delivery of all orders will be made to the address provided by the buyer. Confirmation of
        delivery will be sent to your registered email ID.
      </p>

      <p>
        For any issues or assistance regarding our services, you may contact our helpdesk at{" "}
        <strong>7827747125</strong> or email us at <strong>yashharit1991@gmail.com</strong>.
      </p>
    </div>
  );
};

export default ShippingPolicy;
