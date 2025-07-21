import { InputHTMLAttributes, forwardRef } from "react";

interface MinimalistInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const MinimalistInput = forwardRef<HTMLInputElement, MinimalistInputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full border border-muted text-dark rounded-lg px-3 py-2 focus:outline-none ring-0 ring-primary focus:ring-1 focus:border-primary ${className}`}
        {...props}
      />
    );
  }
);

MinimalistInput.displayName = "MinimalistInput";

export default MinimalistInput;
