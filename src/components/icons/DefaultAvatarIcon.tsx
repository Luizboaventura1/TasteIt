import UserIconSVG from "@/assets/images/user-icon.svg";
import clsx from "clsx";
import Image from "next/image";
import { sizeClasses } from "./constants/sizeClasses";
import type { IconProps } from "./types/IconProps";

export default function SearchIcon({ size = "sm" }: IconProps) {
  return (
    <Image
      className={clsx(sizeClasses[size])}
      src={UserIconSVG}
      alt="User icon"
      width={100}
      height={100}
    />
  );
}
