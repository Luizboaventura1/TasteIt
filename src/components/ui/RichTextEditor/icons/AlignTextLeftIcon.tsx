import { sizeClasses } from "@/components/icons/constants/sizeClasses";
import { IconColor } from "@/components/icons/types/IconColor";
import { IconProps } from "@/components/icons/types/IconProps";
import clsx from "clsx";

interface AlignTextLeftIconProps
  extends IconProps {
  color?: IconColor;
}

const colorClasses: Record<IconColor, string> = {
  dark: "fill-dark",
  light: "fill-light",
  muted: "fill-muted",
};

export default function AlignTextLeftIcon({
  color = "dark",
  size = "md",
}: AlignTextLeftIconProps) {
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
      <g>
        <path
          d="M3 4h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zM3 10h12a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zM3 16h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zM3 22h12a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}
