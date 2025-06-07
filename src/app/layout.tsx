import "../globals.css";
import { ReactNode } from "react";
import ClientLayout from "@/components/features/ClientLayout";

export const metadata = {
  title: "TasteIt",
  description: "Busque receitas deliciosas",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
