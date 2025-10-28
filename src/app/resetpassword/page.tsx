"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

// Moved all hook logic into this inner component
function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });

      toast.success(res.data.message || "Password reset successful!");

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error: any) {
      console.error("Reset failed:", error);
      toast.error(error.response?.data?.error || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      <div className="bg-gray-800/90 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 backdrop-blur-md">
        <h1 className="text-white text-3xl font-bold mb-6 text-center drop-shadow">
          Reset Password
        </h1>

        <label htmlFor="password" className="text-gray-200 mb-1 block">
          New Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 rounded-lg bg-gray-700 text-white border border-gray-600 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="confirmPassword" className="text-gray-200 mb-1 block">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 mb-4 rounded-lg bg-gray-700 text-white border border-gray-600 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className={`w-full px-6 py-2 mt-4 rounded-lg font-semibold transition duration-300 focus:outline-none focus:ring-2 
            ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-400 text-white shadow-md shadow-blue-900/30"
            }`}
        >
          {loading ? "Processing..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}

// Wrap in Suspense to fix Vercel build error
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-300 mt-10">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
