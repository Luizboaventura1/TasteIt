import clsx from "clsx";
import { ReactNode } from "react";

interface PrimaryTextProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeText = {
  sm: "text-md",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
};

export default function PrimaryText({ children, size = "md", className }: PrimaryTextProps) {
  return <h1 className={clsx(sizeText[size], "text-dark font-medium", className)}>{children}</h1>;
}
