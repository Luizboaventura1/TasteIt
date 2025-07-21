import {
  useState,
  useRef,
  useEffect,
} from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef =
    useRef<HTMLDivElement>(null);

  const handleClickOutside = (
    event: MouseEvent
  ) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(
        event.target as Node
      )
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const selectedOption = options.find(
    (option) => option.value === value
  );
  const selectedLabel = selectedOption
    ? selectedOption.label
    : placeholder;

  const handleSelect = (val: string) => {
    if (val !== value) {
      onChange?.(val);
    }
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative w-full ${className}`}
    >
      <button
        type="button"
        className="w-full font-medium border border-muted rounded-lg px-3 py-2 text-dark bg-light flex justify-between items-center focus:outline-none focus:ring-1 focus:border-primary focus:ring-primary cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">
          {selectedLabel}
        </span>
        <svg
          className={`w-5 h-5 ml-2 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 w-full mt-1 bg-light border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
          role="listbox"
          tabIndex={-1}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-3 py-2 cursor-pointer hover:bg-muted/10 text-dark ${
                value === option.value
                  ? "bg-muted/30 font-semibold"
                  : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option.value);
              }}
              role="option"
              aria-selected={
                value === option.value
              }
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.displayName = "Dropdown";
export default Dropdown;
