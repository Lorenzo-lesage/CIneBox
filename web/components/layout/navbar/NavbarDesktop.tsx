"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Components
import { ThemeSwitcher } from "@/components/shared/ThemeSwitcher/ThemeSwitcher";

// Icons
import { LogIn } from "lucide-react";

// Logo
import CineLogo from "@/public/images/CineLogo.png";

export function NavbarDesktop() {
  /*
  |---------------------------------------------------------------------------
  | Render
  |---------------------------------------------------------------------------
  */

  const pathname = usePathname();
  const isLinkActive = (href: string) => pathname === href;
  const linkStyles =
    "transition-opacity font-black text-white flex items-center";
  const activeStyles = "text-white opacity-20 cursor-default";
  const inactiveStyles = "opacity-70 hover:border-b-2 border-primary";

  /*
  |---------------------------------------------------------------------------
  | Render
  |---------------------------------------------------------------------------
  */

  return (
    <nav className="absolute top-0 w-full z-50 bg-transparent">
      <div className="m mx-auto sm:px-6">
        <div className="flex items-center justify-between h-16 ">
          {/* Logo o Brand */}
          <div className="flex-shrink-0 font-bold text-xl tracking-tigh ">
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity font-black text-white flex items-center"
              style={{ textShadow: "0px 0px 2px rgb(32, 3, 3)" }}
            >
              <Image
                src={CineLogo}
                alt="CineBox Logo"
                className="w-40 scale-100 object-contain"
                priority
                style={{
                  filter: "drop-shadow(2px 2px 6px rgba(46, 4, 4, 0.87))",
                }}
              />
   
            </Link>
          </div>

          {/* Links di navigazione */}
          <div className="flex space-x-8 items-center">
            <Link
              href="/"
              className={`${linkStyles} ${isLinkActive("/") ? activeStyles : inactiveStyles}`}
              style={{ textShadow: "0px 0px 2px rgb(32, 3, 3)" }}
            >
              Home
            </Link>
            <Link
              href="/login"
              className={`${linkStyles} ${isLinkActive("/login") ? activeStyles : inactiveStyles}`}
              style={{ textShadow: "0px 0px 2px rgb(32, 3, 3)" }}
            >
              Login
              <LogIn className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/register"
              className={`${linkStyles} ${isLinkActive("/register") ? activeStyles : inactiveStyles}`}
              style={{ textShadow: "0px 0px 2px rgb(32, 3, 3)" }}
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
