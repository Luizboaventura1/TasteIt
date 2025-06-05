import { ReactNode, ButtonHTMLAttributes } from "react";

type Sizes = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: Sizes;
}

export default function PrimaryButton({ children, size = "md", ...props }: Props) {
  const buttonSizes: Record<Sizes, string> = {
    sm: "px-5 py-2 text-base",
    md: "px-8 py-3 text-lg",
    lg: "px-12 py-3 text-xl",
  };

  return (
    <button
      {...props}
      className={`flex items-center gap-3 text-light cursor-pointer bg-primary hover:bg-primary-dark transition-colors duration-200 rounded-full font-medium ${buttonSizes[size]}`}
    >
      {children}
    </button>
  );
}
