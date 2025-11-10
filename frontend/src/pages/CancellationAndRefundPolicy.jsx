import React from "react";
import "../Styles/CancellationAndRefundPolicy.css"; // make sure this path is correct

const CancellationAndRefundPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Cancellation & Refund Policy</h1>
      <p className="updated-date">Last updated on Nov 10, 2025</p>

      <p>
        <strong>VAIBHAV SHARMA</strong> believes in helping its customers as far as possible and
        has therefore a liberal cancellation policy. Under this policy:
      </p>

      <ul>
        <li>
          Cancellations will be considered only if the request is made within 2 days of placing the
          order. However, cancellation requests may not be entertained if the orders have been
          communicated to vendors or merchants and they have initiated the shipping process.
        </li>

        <li>
          <strong>VAIBHAV SHARMA</strong> does not accept cancellation requests for perishable items
          like flowers or eatables. However, refund or replacement can be made if the customer
          establishes that the quality of the delivered product is not good.
        </li>

        <li>
          In case of receipt of damaged or defective items, please report the same to our Customer
          Service team within 2 days of receiving the products. The request will be entertained once
          the merchant has checked and verified the issue at their end.
        </li>

        <li>
          If you feel that the product received is not as shown on the site or as per your
          expectations, notify our Customer Service within 2 days of receipt. The team will review
          your complaint and take an appropriate decision.
        </li>

        <li>
          For products that come with a manufacturer’s warranty, please contact the manufacturer
          directly.
        </li>

        <li>
          In case of any refunds approved by <strong>VAIBHAV SHARMA</strong>, it will take 6–8 days
          for the amount to be processed to the end customer.
        </li>
      </ul>
    </div>
  );
};

export default CancellationAndRefundPolicy;
