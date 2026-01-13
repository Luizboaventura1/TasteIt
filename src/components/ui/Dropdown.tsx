import { useState, useRef, useEffect } from "react";
import { useFloating } from "@floating-ui/react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "Selecionar",
  className = "",
}: DropdownProps) => {
  const { refs, floatingStyles } = useFloating({
    strategy: "fixed",
    placement: "bottom-start",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
      setFocusedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setFocusedIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [focusedIndex]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find((option) => option.value === value);
  const selectedLabel = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (val: string) => {
    if (val !== value) {
      onChange?.(val);
    }
    setIsOpen(false);
    setSearchTerm("");
    setFocusedIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredOptions.length === 0) return;

    switch (e.key) {
      case "Tab":
        e.preventDefault();
        if (e.shiftKey) {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
        } else {
          setFocusedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredOptions[focusedIndex]) {
          handleSelect(filteredOptions[focusedIndex].value);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm("");
        break;
    }
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        className="w-full font-medium border border-muted rounded-lg px-3 py-2 text-dark bg-light flex justify-between items-center focus:outline-none focus:ring-1 focus:border-primary focus:ring-primary cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        ref={refs.setReference}
      >
        <span className="truncate">{selectedLabel}</span>
        <svg
          className={`w-5 h-5 ml-2 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="z-50 w-full mt-1 bg-light border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden"
          role="listbox"
          tabIndex={-1}
          ref={refs.setFloating}
          style={{ ...floatingStyles, width: dropdownRef.current?.offsetWidth + "px" }}
        >
          <div className="sticky top-0 bg-light p-2 border-b border-gray-300">
            <input
              ref={searchInputRef}
              type="text"
              className="w-full px-3 py-2 border border-muted rounded-lg text-dark bg-light focus:outline-none focus:ring-1 focus:border-primary focus:ring-primary"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  ref={(el) => { optionRefs.current[index] = el; }}
                  className={`px-3 py-2 cursor-pointer text-dark ${
                    index === focusedIndex
                      ? "bg-muted/20"
                      : value === option.value
                        ? "bg-muted/30 font-semibold"
                        : "hover:bg-muted/10"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option.value);
                  }}
                  onMouseEnter={() => setFocusedIndex(index)}
                  role="option"
                  aria-selected={value === option.value}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500 text-center">Nenhuma opção encontrada</li>
            )}
          </div>
        </ul>
      )}
    </div>
  );
};

Dropdown.displayName = "Dropdown";
export default Dropdown;
