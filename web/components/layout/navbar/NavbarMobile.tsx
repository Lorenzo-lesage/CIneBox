"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Components
import { ThemeSwitcherMobile } from "@/components/shared/ThemeSwitcher/ThemeSwitcherMobile";

// UI
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// Icons
import { Settings, LogIn } from "lucide-react";

// Logo
import Logo from "@/public/images/Logo.png";
import logoImg from "@/public/images/CineBox.png";

export function NavbarMobile() {
  /*
  |---------------------------------------------------------------------------
  | Render
  |---------------------------------------------------------------------------
  */

  const pathname = usePathname();
  const isLinkActive = (href: string) => pathname === href;
  const linkStyles =
    "transition-opacity font-black text-primary flex items-center text-2xl";
  const activeStyles = "text-primary opacity-20 cursor-default";
  const inactiveStyles = "opacity-70 hover:border-b-2 border-primary";

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
              <Image
                src={Logo}
                alt="CineBox Logo"
                className="w-auto scale-80 object-contain"
                priority
                style={{
                  filter: "drop-shadow(2px 2px 6px rgba(46, 4, 4, 0.87))",
                }}
              />
            </Link>
          </div>

          <Sheet>
            <SheetTrigger>
              <Settings
                className="w-6 h-6 text-white"
                style={{
                  filter: "drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.5))",
                }}
              />
            </SheetTrigger>
            <SheetContent className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]">
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center justify-center w-50">
                    <Image
                      src={logoImg}
                      alt="CineBox Logo"
                      className="object-contain"
                      priority
                    />
                  </div>
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-3 pl-7">
                <SheetClose asChild>
                  <Link
                    href="/"
                    data-slot="sheet-close"
                    className={`${linkStyles} ${isLinkActive("/") ? activeStyles : inactiveStyles}`}
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/login"
                    className={`${linkStyles} ${isLinkActive("/login") ? activeStyles : inactiveStyles}`}
                  >
                    Login
                    <LogIn className="w-4 h-4 ml-2" />
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/register"
                    className={`${linkStyles} ${isLinkActive("/register") ? activeStyles : inactiveStyles}`}
                  >
                    Register
                  </Link>
                </SheetClose>
              </div>
              <SheetFooter>
                <ThemeSwitcherMobile />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
