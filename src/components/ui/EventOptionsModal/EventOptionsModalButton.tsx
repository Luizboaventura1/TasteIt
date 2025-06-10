"use client";

import { ReactNode, LiHTMLAttributes } from "react";

interface EventOptionsModalButtonProps extends LiHTMLAttributes<HTMLLIElement> {
  icon?: ReactNode;
  text: string;
}

export default function EventOptionsModalButton({
  icon,
  text,
  ...props
}: EventOptionsModalButtonProps) {
  return (
    <li
      {...props}
      className="flex items-center gap-3 text-dark text-sm cursor-pointer hover:bg-muted/30 px-2 py-2 rounded-md"
    >
      {icon}
      <p>{text}</p>
    </li>
  );
}
