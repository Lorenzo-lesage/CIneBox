"use client";

import Link from "next/link";

// Components
import { ThemeSwitcher } from "@/components/shared/ThemeSwitcher/ThemeSwitcher";

export function Navbar() {
  /*
  |---------------------------------------------------------------------------
  | Render
  |---------------------------------------------------------------------------
  */

  return (
    <nav className="absolute top-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 ">
          {/* Logo o Brand */}
          <div className="flex-shrink-0 font-bold text-xl tracking-tight">
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity font-black text-white"
              style={{ textShadow: "0px 0px 2px rgb(32, 3, 3)" }}
            >
              MYAPP
            </Link>
          </div>

          {/* Links di navigazione */}
          <div className="flex space-x-8 items-center">
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity font-black text-white"
              style={{ textShadow: "0px 0px 2px rgb(32, 3, 3)" }}
            >
              Home
            </Link>
            <Link
              href="/login"
              className="hover:opacity-80 transition-opacity font-black text-white"
              style={{ textShadow: "0px 0px 2px rgb(32, 3, 3)" }}
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/30"
            >
              Register
            </Link>

            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
