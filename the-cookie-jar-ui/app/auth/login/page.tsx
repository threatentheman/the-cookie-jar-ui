// app/login/page.tsx
"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";  // For redirecting after login
import { auth } from "../../../lib/firebase";  // Firebase setup
import { useAuth } from "../../../context/AuthContext";  // Access auth context

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();  // Use router for redirection
  const { user } = useAuth();  // Check if the user is already logged in

  // If user is already logged in, redirect them to profile or another page
  if (user) {
    router.push("/");
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // Use Firebase auth to sign in
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful!");
      router.push("/profile");  // Redirect to profile or any other page
    } catch (error) {
      setMessage(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 p-12 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {message && <p className="text-red-700 mb-4">{message}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Login Button */}
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <a href="/auth/forgotPassword" className="text-blue-500 underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
