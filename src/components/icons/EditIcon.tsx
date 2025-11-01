import clsx from "clsx";
import { IconProps } from "./types/IconProps";
import { sizeClasses } from "./constants/sizeClasses";

export default function EditIcon({ size = "sm" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0"
      y="0"
      viewBox="0 0 16 16"
      xmlSpace="preserve"
      className={clsx(sizeClasses[size], "fill-light")}
    >
      <g>
        <path
          d="M15.06 2.35 13.65.94a1.663 1.663 0 0 0-2.35.22L9.58 2.88l3.54 3.54 1.72-1.72a2.001 2.001 0 0 0 .59-1.15 1.416 1.416 0 0 0-.37-1.2zM.67 13.77a1.427 1.427 0 0 0 .37 1.19 1.367 1.367 0 0 0 .98.38 1.695 1.695 0 0 0 .22-.01l1.63-.22a2.094 2.094 0 0 0 1.15-.59l7.4-7.4-.71-.71-2.83-2.83-7.4 7.4a2.095 2.095 0 0 0-.59 1.15z"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}
