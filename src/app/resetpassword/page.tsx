"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
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

      // Guaranteed redirect using browser navigation
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Reset Password
        </h1>

        <label htmlFor="password" className="text-white mb-1 block">
          New Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 rounded bg-gray-700 text-white border border-gray-600 w-full"
        />

        <label htmlFor="confirmPassword" className="text-white mb-1 block">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 mb-4 rounded bg-gray-700 text-white border border-gray-600 w-full"
        />

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className={`w-full px-6 py-2 mt-4 rounded-lg focus:outline-none focus:ring-2 transition duration-200
            ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-400 text-white"
            }`}
        >
          {loading ? "Processing..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
