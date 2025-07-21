import { sizeClasses } from "@/components/icons/constants/sizeClasses";
import { IconColor } from "@/components/icons/types/IconColor";
import { IconProps } from "@/components/icons/types/IconProps";
import clsx from "clsx";

interface AlignTextRightIconProps
  extends IconProps {
  color?: IconColor;
}

const colorClasses: Record<IconColor, string> = {
  dark: "fill-dark",
  light: "fill-light",
  muted: "fill-muted",
};

const alignTextRightSizes = {
  ...sizeClasses,
  sm: "w-[20px] h-[20px]",
};

export default function AlignTextRightIcon({
  color = "dark",
  size = "md",
}: AlignTextRightIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      className={clsx(
        colorClasses[color],
        alignTextRightSizes[size]
      )}
    >
      <g>
        <path
          d="M3.25 4.5A.76.76 0 0 1 4 3.75h16a.75.75 0 0 1 0 1.5H4a.76.76 0 0 1-.75-.75zM20 8.75H8a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5zm0 5H4a.75.75 0 0 0 0 1.5h16a.75.75 0 0 0 0-1.5zm0 5H8a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5z"
          data-name="Layer 2"
          fill="#000000"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}
