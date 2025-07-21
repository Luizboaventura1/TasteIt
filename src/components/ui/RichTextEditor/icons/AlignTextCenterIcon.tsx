import { sizeClasses } from "@/components/icons/constants/sizeClasses";
import { IconColor } from "@/components/icons/types/IconColor";
import { IconProps } from "@/components/icons/types/IconProps";
import clsx from "clsx";

interface AlignTextCenterIconProps
  extends IconProps {
  color?: IconColor;
}

const colorClasses: Record<IconColor, string> = {
  dark: "fill-dark",
  light: "fill-light",
  muted: "fill-muted",
};

const alignTextCenterSizes = {
  ...sizeClasses,
  sm: "w-[18px] h-[18px]",
};

export default function AlignTextCenterIcon({
  color = "dark",
  size = "md",
}: AlignTextCenterIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      className={clsx(
        colorClasses[color],
        alignTextCenterSizes[size]
      )}
    >
      <g>
        <path
          d="M21 2H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2zM17 10a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2zM21 14H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2zM17 22a1 1 0 0 0 0-2H7a1 1 0 0 0 0 2z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}
