import DefaultFooter from "@/components/layouts/DefaultFooter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <DefaultFooter />
    </>
  );
}
