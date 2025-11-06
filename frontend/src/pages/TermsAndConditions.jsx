import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <iframe
        src="/terms-and-conditions.pdf"
        title="Terms and Conditions"
        className="w-11/12 h-[90vh] border rounded-lg shadow"
      ></iframe>
    </div>
  );
};

export default TermsAndConditions;
