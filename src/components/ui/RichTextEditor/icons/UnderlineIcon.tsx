import { sizeClasses } from "@/components/icons/constants/sizeClasses";
import { IconColor } from "@/components/icons/types/IconColor";
import { IconProps } from "@/components/icons/types/IconProps";
import clsx from "clsx";

interface UnderlineIconProps extends IconProps {
  color?: IconColor;
}

const colorClasses: Record<IconColor, string> = {
  dark: "fill-dark",
  light: "fill-light",
  muted: "fill-muted",
};

export default function UnderlineIcon({
  color = "dark",
  size = "md",
}: UnderlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 384 384"
      xmlSpace="preserve"
      className={clsx(
        colorClasses[color],
        sizeClasses[size]
      )}
    >
      <g transform="matrix(0.9999999999999996,0,0,0.9999999999999996,-8.526512829121202e-14,-1.9895196601282805e-13)">
        <path
          d="M192 298.667c70.72 0 128-57.28 128-128V0h-53.333v170.667c0 41.28-33.387 74.667-74.667 74.667s-74.667-33.387-74.667-74.667V0H64v170.667c0 70.72 57.28 128 128 128zM42.667 341.333h298.667V384H42.667z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}
