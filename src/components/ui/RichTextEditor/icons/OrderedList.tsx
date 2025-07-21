import { sizeClasses } from "@/components/icons/constants/sizeClasses";
import { IconColor } from "@/components/icons/types/IconColor";
import { IconProps } from "@/components/icons/types/IconProps";
import clsx from "clsx";

interface OrderedListIconProps extends IconProps {
  color?: IconColor;
}

const colorClasses: Record<IconColor, string> = {
  dark: "fill-dark",
  light: "fill-light",
  muted: "fill-muted",
};

export default function OrderedListIcon({
  color = "dark",
  size = "md",
}: OrderedListIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 490.667 490"
      xmlSpace="preserve"
      className={clsx(
        colorClasses[color],
        sizeClasses[size]
      )}
    >
      <g>
        <path
          d="M48 171H16c-8.832 0-16 7.168-16 16s7.168 16 16 16h32a5.334 5.334 0 0 1 5.332 5.332v5.336A5.334 5.334 0 0 1 48 219H37.332C16.746 219 0 235.746 0 256.332V283c0 8.832 7.168 16 16 16h53.332c8.832 0 16-7.168 16-16s-7.168-16-16-16H32v-10.668A5.336 5.336 0 0 1 37.332 251H48c20.586 0 37.332-16.746 37.332-37.332v-5.336C85.332 187.746 68.586 171 48 171zM48 341.668H16c-8.832 0-16 7.168-16 16s7.168 16 16 16h32A5.331 5.331 0 0 1 53.332 379v5.332A5.335 5.335 0 0 1 48 389.668H26.668c-8.832 0-16 7.168-16 16s7.168 16 16 16H48A5.331 5.331 0 0 1 53.332 427v5.332A5.335 5.335 0 0 1 48 437.668H16c-8.832 0-16 7.168-16 16s7.168 16 16 16h32c20.586 0 37.332-16.746 37.332-37.336V427c0-7.938-2.539-15.273-6.781-21.332 4.242-6.059 6.781-13.398 6.781-21.336V379c0-20.586-16.746-37.332-37.332-37.332zM16 32.332h16v80c0 8.832 7.168 16 16 16s16-7.168 16-16v-96c0-8.832-7.168-16-16-16H16c-8.832 0-16 7.168-16 16s7.168 16 16 16zM149.332 85.668h320c11.797 0 21.336-9.54 21.336-21.336S481.128 43 469.332 43h-320C137.535 43 128 52.535 128 64.332s9.535 21.336 21.332 21.336zM469.332 213.668h-320C137.535 213.668 128 223.203 128 235s9.535 21.332 21.332 21.332h320c11.797 0 21.336-9.535 21.336-21.332s-9.54-21.332-21.336-21.332zM469.332 384.332h-320c-11.797 0-21.332 9.54-21.332 21.336S137.535 427 149.332 427h320c11.797 0 21.336-9.535 21.336-21.332s-9.54-21.336-21.336-21.336zm0 0"
          fill="#000000"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
}
