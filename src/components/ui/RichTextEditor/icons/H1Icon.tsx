import { sizeClasses } from "@/components/icons/constants/sizeClasses";
import { IconColor } from "@/components/icons/types/IconColor";
import { IconProps } from "@/components/icons/types/IconProps";
import clsx from "clsx";

interface H1IconProps extends IconProps {
  color?: IconColor;
}

const colorClasses: Record<IconColor, string> = {
  dark: "fill-dark",
  light: "fill-light",
  muted: "fill-muted",
};

export default function H1Icon({
  color = "dark",
  size = "md",
}: H1IconProps) {
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
      <g transform="matrix(1.2000000000000006,0,0,1.2000000000000006,-2.4000000000000057,-2.4000000000000057)">
        <path
          d="M12 4h2v16h-2v-7H4v7H2V4h2v7h8zm8.492 0-3.708 3.802 1.432 1.396L20 7.369V20h2V4z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}
