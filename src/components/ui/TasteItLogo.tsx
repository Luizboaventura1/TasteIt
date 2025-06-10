"use client";

import TasteItLogoWhiteTheme from "@/assets/images/tasteit-logo-white-theme.svg";
import Image from "next/image";

export default function TasteItLogo({ size = 48 }) {
  return (
    <>
      <Image
        src={TasteItLogoWhiteTheme}
        style={{ width: size + "px", height: size + "px" }}
        alt="TasteIt Logo"
        priority
      />
    </>
  );
}
