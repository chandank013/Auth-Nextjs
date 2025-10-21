"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();

  // Mock user data (replace with real auth/user data)
  const user = {
    username: "john_doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?img=3", // example avatar
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // TODO: Clear auth token/session here
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      {/* Card Container */}
      <div className="bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md">
        {/* Header with Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-500">
            <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-white text-3xl font-bold">{user.username}</h1>
          <p className="text-gray-300 mt-1">{user.email}</p>
        </div>

        <hr className="border-gray-700 mb-6" />

        {/* Profile Details */}
        <div className="text-white mb-6 space-y-2">
          <p>
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          {/* Add more profile info here if needed */}
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 font-semibold"
        >
          Logout
        </button>

        {/* Home Link */}
        <p className="text-center mt-4 text-gray-300">
          Go back to{" "}
          <Link href="/" className="text-blue-400 underline hover:text-blue-500 transition duration-200">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
