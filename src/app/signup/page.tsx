"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  // User state
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Loading and button states
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Inline error message
  const [errorMessage, setErrorMessage] = useState("");

  // Enable/disable button based on input
  useEffect(() => {
    if (user.username && user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  // Signup handler
  const onSignup = async () => {
    try {
      setLoading(true);
      setErrorMessage(""); // clear previous error

      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success:", response.data);

      toast.success(response.data.message || "Signup successful!");
      router.push("/login");
    } catch (error: any) {
      // Get backend error safely
      const message = error?.response?.data?.error || error.message || "Signup failed";
      console.error("Signup failed:", message);

      // Show toast
      toast.error(message);

      // Show inline error below the form
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          {loading ? "Processing..." : "Signup"}
        </h1>

        {/* Username */}
        <label htmlFor="username" className="text-white mb-1 block">Username</label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter username"
          className="p-2 mb-4 rounded bg-gray-700 text-white border border-gray-600 w-full"
        />

        {/* Email */}
        <label htmlFor="email" className="text-white mb-1 block">Email</label>
        <input
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email"
          className="p-2 mb-4 rounded bg-gray-700 text-white border border-gray-600 w-full"
        />

        {/* Password */}
        <label htmlFor="password" className="text-white mb-1 block">Password</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
          className="p-2 mb-4 rounded bg-gray-700 text-white border border-gray-600 w-full"
        />

        {/* Inline error message */}
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}

        {/* Signup button */}
        <button
          type="button"
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className={`w-full px-6 py-2 mt-4 rounded-lg focus:outline-none focus:ring-2 transition duration-200
            ${buttonDisabled || loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-400 text-white"}`}
        >
          {loading ? "Processing..." : "Signup"}
        </button>

        {/* Link to login */}
        <p className="text-center mt-4 text-white">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 underline">
            Visit login page
          </Link>
        </p>
      </div>
    </div>
  );
}
