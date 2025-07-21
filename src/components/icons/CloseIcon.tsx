import clsx from "clsx";
import { sizeClasses } from "./constants/sizeClasses";
import { IconColor } from "./types/IconColor";
import { IconProps } from "./types/IconProps";

interface CloseIconProps extends IconProps {
  color?: IconColor;
}

const colorClasses: Record<IconColor, string> = {
  dark: "fill-dark",
  light: "fill-light",
  muted: "fill-muted",
};

const iconSize = {
  ...sizeClasses,
  sm: "w-3 h-3",
};

export default function CloseIcon({ color = "dark", size = "md" }: CloseIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512.001 512.001"
      xmlSpace="preserve"
      className={clsx(iconSize[size], colorClasses[color])}
    >
      <g>
        <path
          d="M307.738 256.001 501.286 62.454c14.287-14.287 14.287-37.451.001-51.738C487-3.571 463.836-3.571 449.549 10.715L256.001 204.263 62.454 10.716c-14.287-14.287-37.451-14.287-51.738 0s-14.287 37.451 0 51.738L204.264 256 10.715 449.548c-14.287 14.287-14.287 37.451.001 51.738 14.287 14.287 37.451 14.286 51.738-.001l193.548-193.546 193.547 193.546c14.35 14.224 37.513 14.122 51.737-.228 14.135-14.26 14.135-37.249 0-51.509z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}
