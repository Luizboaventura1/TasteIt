import DefaultFooter from "@/components/layouts/DefaultFooter";
import MainNavbar from "@/components/layouts/MainNavbar";
import ClientLayout from "@/components/features/ClientLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientLayout>
      <MainNavbar />
      <main>{children}</main>
      <DefaultFooter />
    </ClientLayout>
  );
}
