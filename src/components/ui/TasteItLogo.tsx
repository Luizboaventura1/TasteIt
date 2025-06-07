"use client";

import TasteItLogoBlackTheme from "@/assets/images/tasteit-logo-black-theme.svg";
import TasteItLogoWhiteTheme from "@/assets/images/tasteit-logo-white-theme.svg";
import Image from "next/image";

export default function TasteItLogo({ theme = "dark", size = 48 }) {
  return (
    <>
      <Image
        src={theme === "dark" ? TasteItLogoBlackTheme : TasteItLogoWhiteTheme}
        style={{ width: size + "px", height: size + "px" }}
        alt="TasteIt Logo"
        priority
      />
    </>
  );
}
