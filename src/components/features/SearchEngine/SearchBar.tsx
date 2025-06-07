import { InputHTMLAttributes } from "react";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export default function SearchBar({ placeholder = "Buscar receita...", ...props }: SearchBarProps) {
  return (
    <input
      type="text"
      className="w-full border border-muted/90 rounded-full px-4 py-2 focus:outline-none"
      placeholder={placeholder}
      {...props}
    />
  );
}
