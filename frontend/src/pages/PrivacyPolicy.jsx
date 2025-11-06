import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center">
      <h1 className="text-2xl font-semibold mb-4">Privacy Policy</h1>
      <p className="mb-4">You can view our full privacy policy below:</p>
      <a
        href="/public/privacy-policy.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Open Privacy Policy (PDF)
      </a>
    </div>
  );
};

export default PrivacyPolicy;
