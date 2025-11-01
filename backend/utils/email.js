import axios from "axios";

const sendResetEmail = async ({ to, resetUrl }) => {
  try {
    await axios.post("https://api.resend.com/emails", {
      from: "Kapde <onboarding@resend.dev>",
      to,
      subject: "Password reset — Kapde",
      html: `
        <p>Hi,</p>
        <p>You requested a password reset. Click below to reset your password.</p>
        <a href="${resetUrl}">Reset password</a>
        <p>If you didn't request this, ignore this email.</p>
      `,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
    });
  } catch (error) {
    console.error("Resend email error:", error.response?.data || error.message);
    throw new Error("Failed to send email");
  }
};

export { sendResetEmail };
