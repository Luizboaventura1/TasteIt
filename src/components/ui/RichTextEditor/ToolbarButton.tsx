import { ReactElement } from "react";

interface ToolbarButtonProps {
  icon: ReactElement;
  isActive: boolean;
  onClick: () => void;
}

export default function ToolbarButton({ icon, isActive, onClick }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive ? "bg-neutral-400/60" : "bg-none"
      } rounded-md hover:bg-neutral-300 cursor-pointer p-2`}
    >
      {icon}
    </button>
  );
}
