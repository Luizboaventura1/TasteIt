"use client"

import LooginFooter from "@/components/layouts/LoginFooter";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import TasteItLogo from "@/components/ui/TasteItLogo";
import Link from "next/link";

export default function Login() {
  return (
    <header className="grid grid-rows-3 w-full px-4 h-screen bg-light">
      <nav className="h-[80px] flex items-center">
        <div className="container mx-auto">
          <Link href="/">
            <TasteItLogo theme="white" size={60} />
          </Link>
        </div>
      </nav>

      <section className="flex justify-center items-center">
        <div className="container mx-auto flex flex-col items-center gap-2 text-center">
          <GoogleLoginButton onClick={() => console.log("Working")}>Login com Google</GoogleLoginButton>
          <h1 className="font-medium text-sm text-dark">A um passo de fazer receitas incríveis!</h1>
        </div>
      </section>

      <div className="flex items-end">
        <LooginFooter />
      </div>
    </header>
  );
}
