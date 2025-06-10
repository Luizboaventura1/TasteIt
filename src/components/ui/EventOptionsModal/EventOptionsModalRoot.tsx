"use client"

import { ReactNode } from "react";

interface EventOptionsModalProps {
  children: ReactNode;
}

export default function EventOptionsModal({ children, ...props }: EventOptionsModalProps) {
  return (
    <ul {...props} className="border border-muted bg-light rounded-lg p-2 w-54 shadow-md shadow-black-200">
      {children}
    </ul>
  );
}
