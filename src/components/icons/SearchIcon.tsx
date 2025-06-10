import clsx from "clsx";
import { sizeClasses } from "./constants/sizeClasses";
import type { IconProps } from "./types/IconProps";

interface SearchIconProps extends IconProps {
  color?: "muted" | "primary";
}

const colorClasses = {
  muted: "fill-muted",
  primary: "fill-primary",
};

export default function SearchIcon({ size = "sm", color = "muted" }: SearchIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      className={clsx(sizeClasses[size], colorClasses[color])}
    >
      <g>
        <path
          d="m27.707 26.293-5.969-5.969A9.95 9.95 0 0 0 24 14c0-5.514-4.486-10-10-10S4 8.486 4 14s4.486 10 10 10c2.398 0 4.6-.85 6.324-2.262l5.969 5.969a.999.999 0 1 0 1.414-1.414zM6 14c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8-8-3.589-8-8z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}
