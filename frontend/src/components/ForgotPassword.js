import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset password email sent to:", email);
    alert(`If ${email} exists, a reset link has been sent.`);
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Forgot Password</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="auth-btn">Send Reset Link</button>
      </form>
      <p className="auth-footer">
        Remembered your password? <a href="/login">Login</a>
      </p>
    </div>
  );
}
