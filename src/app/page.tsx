"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 font-sans transition-colors duration-300">
      {/* 🌐 Navbar (Minimal) */}
      <nav className="w-full bg-black/60 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* 🔹 Logo / Brand */}
          <Link
            href="/"
            className="text-2xl font-bold text-blue-500 tracking-tight"
          >
            MyApp
          </Link>

          {/* 📱 Mobile Menu Button (Still needed to hide/show the menu div) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300 focus:outline-none"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu (Now empty but kept for structure) */}
        {menuOpen && (
          <div className="md:hidden bg-gray-900/90 border-t border-gray-800 shadow-xl px-6 py-4 flex flex-col gap-4">
            {/* Navigation items removed */}
          </div>
        )}
      </nav>

      {/* 🏠 Landing Page Content */}
      <main className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            MyApp
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mb-10 leading-relaxed">
          A secure and modern application system built with{" "}
          <span className="text-blue-400 font-semibold">Next.js</span>,{" "}
          <span className="text-purple-400 font-semibold">Tailwind CSS</span>, and{" "}
          <span className="text-pink-400 font-semibold">MongoDB</span>.
        </p>
        {/* Main CTA Buttons removed */}
      </main>

      {/* 🦶 Footer */}
      <footer className="w-full border-t border-gray-800 bg-black/40 py-6">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            {/* Footer links removed */}
          </div>
        </div>
      </footer>
    </div>
  );
}