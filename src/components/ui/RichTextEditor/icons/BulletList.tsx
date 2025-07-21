import { sizeClasses } from "@/components/icons/constants/sizeClasses";
import { IconColor } from "@/components/icons/types/IconColor";
import { IconProps } from "@/components/icons/types/IconProps";
import clsx from "clsx";

interface BulletListIconProps extends IconProps {
  color?: IconColor;
}

const colorClasses: Record<IconColor, string> = {
  dark: "fill-dark",
  light: "fill-light",
  muted: "fill-muted",
};

export default function BulletListIcon({
  color = "dark",
  size = "md",
}: BulletListIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 60.123 60.123"
      xmlSpace="preserve"
      className={clsx(
        colorClasses[color],
        sizeClasses[size]
      )}
    >
      <g>
        <path
          d="M57.124 51.893H16.92a3 3 0 1 1 0-6h40.203a3 3 0 0 1 .001 6zM57.124 33.062H16.92a3 3 0 1 1 0-6h40.203a3 3 0 0 1 .001 6zM57.124 14.231H16.92a3 3 0 1 1 0-6h40.203a3 3 0 0 1 .001 6z"
          opacity="1"
          data-original="#000000"
        ></path>
        <circle
          cx="4.029"
          cy="11.463"
          r="4.029"
          opacity="1"
          data-original="#000000"
        ></circle>
        <circle
          cx="4.029"
          cy="30.062"
          r="4.029"
          opacity="1"
          data-original="#000000"
        ></circle>
        <circle
          cx="4.029"
          cy="48.661"
          r="4.029"
          opacity="1"
          data-original="#000000"
        ></circle>
      </g>
    </svg>
  );
}
