import DefaultFooter from "@/components/layouts/DefaultFooter";
import MainNavbar from "@/components/layouts/MainNavbar";
import ClientLayout from "@/components/features/ClientLayout";
import "../../globals.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-light">
        <ClientLayout>
          <MainNavbar />
          <main>{children}</main>
          <DefaultFooter />
        </ClientLayout>
      </body>
    </html>
  );
}
