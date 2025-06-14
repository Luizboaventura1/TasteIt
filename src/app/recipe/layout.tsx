import DefaultFooter from "@/components/layouts/DefaultFooter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-screen">{children}</main>
      <DefaultFooter />
    </>
  );
}
