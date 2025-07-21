import { sizeClasses } from "@/components/icons/constants/sizeClasses";
import { IconColor } from "@/components/icons/types/IconColor";
import { IconProps } from "@/components/icons/types/IconProps";
import clsx from "clsx";

interface ItalicIconProps extends IconProps {
  color?: IconColor;
}

const colorClasses: Record<IconColor, string> = {
  dark: "fill-dark",
  light: "fill-light",
  muted: "fill-muted",
};

export default function ItalicIcon({ color = "dark", size = "md" }: ItalicIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 305 305"
      xmlSpace="preserve"
      className={clsx(colorClasses[color], sizeClasses[size])}
    >
      <g>
        <path
          d="M275 30V0H135v30h48.216L89.671 275H30v30h140v-30h-48.216l93.545-245z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}
