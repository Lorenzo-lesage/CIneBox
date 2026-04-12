"use client";

// Components
import { NavbarMobile } from "./navbar/NavbarMobile";
import { NavbarDesktop } from "./navbar/NavbarDesktop";

export function Navbar() {
  /*
  |---------------------------------------------------------------------------
  | Render
  |---------------------------------------------------------------------------
  */
  return (
    <>
      {/* Navbar Mobile: visibile solo sotto i 768px (md) */}
      <div className="block md:hidden">
        <NavbarMobile />
      </div>

      {/* Navbar Desktop: nascosta sotto i 768px, visibile sopra */}
      <div className="hidden md:block">
        <NavbarDesktop />
      </div>
    </>
  );
}
