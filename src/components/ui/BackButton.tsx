import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface BackButtonProps {
  children: ReactNode;
}

export default function BackButton({ children }: BackButtonProps) {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="flex items-center text-dark font-medium gap-3 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        className="fill-dark w-4 h-4"
      >
        <g>
          <path
            fillRule="evenodd"
            d="M190.78 93.665c11.108 11.108 11.108 29.118 0 40.227l-93.665 93.664h386.44c15.71 0 28.444 12.735 28.444 28.444s-12.735 28.444-28.444 28.444H97.115l93.665 93.665c11.108 11.108 11.108 29.119 0 40.226-11.108 11.108-29.118 11.108-40.227 0L8.331 276.114c-11.108-11.108-11.108-29.118 0-40.227L150.553 93.665c11.109-11.108 29.119-11.108 40.227 0z"
            clipRule="evenodd"
            opacity="1"
            data-original="#000000"
          ></path>
        </g>
      </svg>
      {children}
    </button>
  );
}
