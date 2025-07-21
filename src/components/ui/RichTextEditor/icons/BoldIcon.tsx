import { sizeClasses } from "@/components/icons/constants/sizeClasses";
import { IconColor } from "@/components/icons/types/IconColor";
import { IconProps } from "@/components/icons/types/IconProps";
import clsx from "clsx";

interface BoldIconProps extends IconProps {
  color?: IconColor;
}

const colorClasses: Record<IconColor, string> = {
  dark: "fill-dark",
  light: "fill-light",
  muted: "fill-muted",
};

export default function BoldIcon({
  color = "dark",
  size = "md",
}: BoldIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      className={clsx(
        colorClasses[color],
        sizeClasses[size]
      )}
    >
      <g transform="matrix(1.5000000000000018,0,0,1.5000000000000018,-6.000000000000037,-6.000000000000037)">
        <path
          d="M8 11h4.5a2.5 2.5 0 0 0 0-5H8zm10 4.5a4.501 4.501 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.5 4.5 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 0 0 0-5z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}
