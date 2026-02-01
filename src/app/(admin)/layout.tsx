import DefaultFooter from "@/components/layouts/DefaultFooter";
import MainNavbar from "@/components/layouts/MainNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNavbar />
      <main>{children}</main>
      <DefaultFooter />
    </>
  );
}
