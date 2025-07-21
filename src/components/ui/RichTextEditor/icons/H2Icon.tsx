import { sizeClasses } from "@/components/icons/constants/sizeClasses";
import { IconColor } from "@/components/icons/types/IconColor";
import { IconProps } from "@/components/icons/types/IconProps";
import clsx from "clsx";

interface H2IconProps extends IconProps {
  color?: IconColor;
}

const colorClasses: Record<IconColor, string> = {
  dark: "fill-dark",
  light: "fill-light",
  muted: "fill-muted",
};

const h2Sizes = {
  ...sizeClasses,
  sm: "w-[19px] h-[19px]",
};

export default function H2Icon({
  color = "dark",
  size = "md",
}: H2IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      className={clsx(
        colorClasses[color],
        h2Sizes[size]
      )}
    >
      <g>
        <path
          d="M10 4h2v16h-2v-7H2v7H0V4h2v7h8zm9.141 11.592C21.306 14.089 24 12.218 24 9c0-2.757-2.243-5-5-5s-5 2.243-5 5h2c0-1.654 1.346-3 3-3s3 1.346 3 3c0 2.172-1.943 3.521-4 4.949-1.966 1.365-4 2.777-4 5.051v1h10v-2h-7.67c.535-.827 1.649-1.602 2.811-2.408z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}
