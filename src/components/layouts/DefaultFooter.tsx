import Link from "next/link";
import TasteItLogo from "../ui/TasteItLogo";
import GitHubLink from "../ui/GitHubLink";

export default function DefaultFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="flex items-center border-t border-muted w-full bg-light py-4 md:py-0">
        <div className="block md:flex items-center justify-between space-y-4 md:space-y-0 container mx-auto px-4">
          <div className="flex justify-between">
            <TasteItLogo theme="light" size={60} />
            <div className="flex items-center md:hidden">
              <GitHubLink />
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-3 md:items-center text-sm">
            <p>© {currentYear} Todos os direitos reservados</p>
            <div className="block md:flex">
              <div>
                <Link href="#">Termos</Link>
              </div>
              <span className="hidden md:inline px-1"> | </span>
              <div>
                <Link href="#">Política de Privacidade</Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <GitHubLink />
          </div>
        </div>
      </footer>
    </>
  );
}
