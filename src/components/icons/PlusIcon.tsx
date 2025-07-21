import clsx from "clsx";
import { sizeClasses } from "./constants/sizeClasses";
import type { IconProps } from "./types/IconProps";
import { IconColor } from "./types/IconColor";

interface PlusIconProps extends IconProps {
  color?: IconColor;
}

const colorClasses: Record<IconColor, string> = {
  dark: "fill-dark",
  light: "fill-light",
  muted: "fill-muted",
};

export default function PlusIcon({ size = "md", color = "light" }: PlusIconProps) {
  return (
    <svg
      className={clsx(sizeClasses[size], colorClasses[color])}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 93.562 93.562"
      xmlSpace="preserve"
    >
      <g>
        <path
          d="m87.952 41.17-36.386.11V5.61A5.598 5.598 0 0 0 45.956 0a5.598 5.598 0 0 0-5.61 5.61l.11 35.561H5.61A5.598 5.598 0 0 0 0 46.781a5.597 5.597 0 0 0 5.61 5.609h34.791v35.562a5.599 5.599 0 0 0 5.61 5.61 5.599 5.599 0 0 0 5.61-5.61V52.391h36.331a5.599 5.599 0 0 0 5.61-5.61 5.616 5.616 0 0 0-5.61-5.611z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}
