"use client";

import { usePathname } from "next/navigation";
import MainNavbar from "./MainNavbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbar =
    pathname === "/" || pathname.startsWith("/profile") || pathname.startsWith("/recipe");

  return (
    <>
      {showNavbar && (
        <div className="h-[80px]">
          <div className="fixed z-40 top-0 left-0 w-full">
            <MainNavbar />
          </div>
        </div>
      )}
      {children}
    </>
  );
}
