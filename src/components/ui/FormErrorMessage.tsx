import React from "react";

interface FormErrorMessageProps {
  message: string;
}

export default function FormErrorMessage({ message }: FormErrorMessageProps) {
  if (!message) {
    return null;
  }

  return <p className="text-red-700 text-sm">{message}</p>;
}
