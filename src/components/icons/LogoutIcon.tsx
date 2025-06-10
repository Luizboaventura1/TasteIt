import clsx from "clsx";
import { sizeClasses } from "./constants/sizeClasses";
import { IconProps } from "./types/IconProps";

const fill = "fill-dark";

export default function LogoutIcon({ size = "sm" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      className={clsx(sizeClasses[size], fill)}
    >
      <g>
        <g fill="#131b33">
          <path
            d="M10 21.75c-6.88 0-7.75-.87-7.75-7.75v-4c0-6.88.87-7.75 7.75-7.75a.75.75 0 0 1 0 1.5c-6.075 0-6.25.175-6.25 6.25v4c0 6.075.175 6.25 6.25 6.25a.75.75 0 0 1 0 1.5z"
            opacity="1"
            data-original="#131b33"
          ></path>
          <path
            d="M21 12.75H9a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 0 1.5z"
            opacity="1"
            data-original="#131b33"
          ></path>
          <path
            d="M17.42 16.75a.75.75 0 0 1-.517-1.294l3.131-2.973c.138-.13.214-.302.214-.483s-.076-.353-.214-.484l-3.13-2.972a.75.75 0 0 1 1.034-1.088l3.13 2.973a2.151 2.151 0 0 1 0 3.142l-3.13 2.973a.749.749 0 0 1-.517.206z"
            opacity="1"
            data-original="#131b33"
          ></path>
        </g>
      </g>
    </svg>
  );
}
