"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    console.log("Logging in:", user);
    // Example API call:
    // await axios.post("/api/login", user)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Card Container */}
      <div className="bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Login</h1>
        
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
          className="w-full px-6 py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          Login Here
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