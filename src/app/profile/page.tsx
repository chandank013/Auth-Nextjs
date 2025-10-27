"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
      toast.success("User details fetched successfully!");
    } catch (error: any) {
      toast.error("Failed to fetch user details");
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-400 mb-6">Welcome to your profile page</p>

        <hr className="border-gray-700 mb-6" />

        {/* User Info */}
        <div className="mb-6">
          <h2 className="text-lg text-white font-semibold mb-2">
            User ID:
          </h2>
          <div className="bg-gray-700 text-white px-4 py-2 rounded-lg font-mono break-all">
            {data === "nothing" ? (
              "No data available"
            ) : (
              <Link
                href={`/profile/${data}`}
                className="text-blue-400 hover:underline"
              >
                {data}
              </Link>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={getUserDetails}
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition duration-200"
          >
            Get User Details
          </button>

          <button
            onClick={logout}
            className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>

        <hr className="border-gray-700 my-6" />

        {/* Back to Home */}
        <p className="text-gray-300">
          Go back to{" "}
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-500 underline transition duration-200"
          >
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
