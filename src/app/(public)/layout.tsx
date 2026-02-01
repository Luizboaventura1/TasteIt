import "../../globals.css";
import { ReactNode } from "react";
import ClientLayout from "@/components/features/ClientLayout";
import LayoutWrapper from "@/components/layouts/LayoutWrapper";

export const metadata = {
  title: "TasteIt",
  description: "Busque receitas deliciosas",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-light">
        <ClientLayout>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ClientLayout>
      </body>
    </html>
  );
}
