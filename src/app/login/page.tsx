"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Enable button only if both fields are filled
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) 
      setButtonDisabled(false);
    else 
      setButtonDisabled(true);
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success:", response.data);
      toast.success("Login successful!");
      router.push("/profile"); // redirect to profile page
    } catch (error: any) {
      const message =
        error?.response?.data?.error || error.message || "Login failed";
      console.error("Login failed:", message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          {loading ? "Processing..." : "Login"}
        </h1>

        <label htmlFor="email" className="text-white mb-1 block">Email</label>
        <input
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter email"
          className="p-2 mb-4 rounded bg-gray-700 text-white border border-gray-600 w-full"
        />

        <label htmlFor="password" className="text-white mb-1 block">Password</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter password"
          className="p-2 mb-4 rounded bg-gray-700 text-white border border-gray-600 w-full"
        />

        <button
          type="button"
          onClick={onLogin}
          disabled={buttonDisabled}
          className={`w-full px-6 py-2 mt-4 text-white rounded-lg transition duration-200 focus:outline-none focus:ring-2 ${
            buttonDisabled
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-400"
          }`}
        >
          {loading ? "Processing..." : "Login Here"}
        </button>

        <p className="text-center mt-4 text-white">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-400 underline">
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
}
