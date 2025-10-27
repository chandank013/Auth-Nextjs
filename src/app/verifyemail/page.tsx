"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      {/* Card Container */}
      <div className="bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md text-center border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-6">Verify Your Email</h1>

        <div className="mb-4">
          <h2 className="text-sm text-gray-300">Token:</h2>
          <p className="text-xs font-mono bg-gray-700 text-gray-100 p-2 rounded-md break-all border border-gray-600">
            {token ? token : "No token found"}
          </p>
        </div>

        {/* Verification Result */}
        {verified && (
          <div className="mt-6 text-green-400">
            <h2 className="text-2xl font-semibold mb-2">Email Verified!</h2>
            <Link
              href="/login"
              className="inline-block bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-all mt-3"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="mt-6 text-red-500">
            <h2 className="text-2xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-sm">Invalid or expired verification link. Please try again.</p>
          </div>
        )}

        {!verified && !error && (
          <p className="mt-6 text-gray-400 animate-pulse">Verifying your email...</p>
        )}
      </div>
    </div>
  );
}
