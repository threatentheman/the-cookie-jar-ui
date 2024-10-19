// app/forgot-password/page.tsx
"use client";

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Input, Button } from "@nextui-org/react";
import { auth } from "../../../lib/firebase";  // Firebase setup

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // Firebase function to send password reset email
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-12 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>
        {message && <p className={`mb-4 ${message.includes("Error") ? "text-red-700" : "text-green-700"}`}>{message}</p>}

        <form onSubmit={handleResetPassword} className="space-y-6">
          {/* Email Input */}
          <Input
            type="email"
            name="email"
            label="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Reset Password Button */}
          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Email"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
