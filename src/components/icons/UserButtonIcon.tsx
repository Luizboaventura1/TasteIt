import clsx from "clsx";
import { sizeClasses } from "./constants/sizeClasses";
import type { IconProps } from "./types/IconProps";

const fill = "text-dark";

export default function UserButtonIcon({ size = "sm" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      className={clsx(sizeClasses[size], fill)}
    >
      <g transform="matrix(0.7800000000000004,0,0,0.7800000000000004,56.31999999999991,56.31999999999991)">
        <path
          d="M433 512c-11.046 0-20-8.954-20-20 0-78.299-63.701-142-142-142h-30c-78.299 0-142 63.701-142 142 0 11.046-8.954 20-20 20s-20-8.954-20-20c0-100.355 81.645-182 182-182h30c100.355 0 182 81.645 182 182 0 11.046-8.954 20-20 20zM254 270c-74.439 0-135-60.561-135-135S179.561 0 254 0s135 60.561 135 135-60.561 135-135 135zm0-230c-52.383 0-95 42.617-95 95s42.617 95 95 95 95-42.617 95-95-42.617-95-95-95z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}
