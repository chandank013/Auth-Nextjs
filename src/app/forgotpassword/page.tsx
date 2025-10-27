"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email.includes("@")) {
        toast.error("Please enter a valid email");
        setLoading(false);
        return;
      }

      const response = await axios.post("/api/users/forgotpassword", {
        email: email.trim(),
      });

      toast.success(response.data.message || "Reset link sent!");
      setSent(true);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md text-center border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-6">Forgot Password</h1>

        {!sent ? (
          <>
            <p className="text-gray-300 mb-6">
              Enter your registered email to receive a password reset link.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 mb-4 rounded bg-gray-700 text-white border border-gray-600 w-full"
            />

            <button
              onClick={handleSubmit}
              disabled={!email || loading}
              className={`w-full px-6 py-2 rounded-lg focus:outline-none focus:ring-2 transition duration-200
                ${
                  !email || loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-400 text-white"
                }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-gray-400 mt-4">
              Remembered your password?{" "}
              <Link href="/login" className="text-blue-400 underline hover:text-blue-500">
                Back to Login
              </Link>
            </p>
          </>
        ) : (
          <p className="text-green-400 font-medium mt-6">
            Reset link sent! Please check your email inbox.
          </p>
        )}
      </div>
    </div>
  );
}
