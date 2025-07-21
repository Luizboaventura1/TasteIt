import clsx from "clsx";
import { ReactNode } from "react";

interface SecondaryTextProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeText = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export default function SecondaryText({ children, size = "md", className }: SecondaryTextProps) {
  return <p className={clsx(sizeText[size], "text-dark font-normal", className)}>{children}</p>;
}
