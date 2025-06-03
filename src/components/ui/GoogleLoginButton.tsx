import GoogleImage from "@/assets/images/google-image.svg";
import Image from "next/image";

interface GoogleLoginButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function GoogleLoginButton({ onClick, children }: GoogleLoginButtonProps) {
  return (
    <>
      <button
        onClick={() => onClick()}
        className="flex items-center gap-3 bg-light hover:bg-muted/10 rounded-full border border-muted text-dark font-medium p-2 transition-colors duration-200 cursor-pointer"
      >
        <Image className="w-8 h-8" src={GoogleImage} alt="Google image" priority />

        <p className="px-5">{children}</p>
      </button>
    </>
  );
}
