import Link from "next/link";
import AccountUserModal from "../features/AccountUserModal";
import SearchEngine from "../features/SearchEngine";
import TasteItLogo from "../ui/TasteItLogo";

export default function MainNavbar() {
  return (
    <nav className="h-[80px] border-b border-muted bg-light">
      <div className="flex items-center justify-between gap-4 container h-full mx-auto px-4">
        <div className="hidden md:block">
          <Link href="/">
            <TasteItLogo size={70} />
          </Link>
        </div>

        <SearchEngine />

        <div className="hidden md:block cursor-pointer">
          <AccountUserModal />
        </div>
      </div>
    </nav>
  );
}
