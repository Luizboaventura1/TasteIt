import SearchIcon from "@/components/icons/SearchIcon";
import { InputHTMLAttributes, useRef } from "react";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export default function SearchBar({ placeholder = "Buscar receita...", ...props }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-4 w-full border border-muted/90 rounded-full px-4 py-1 cursor-pointer"
    >
      <SearchIcon size="lg" color="primary" />
      <input
        ref={inputRef}
        type="text"
        className="w-full focus:outline-none"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
