import DefaultFooter from "@/components/layouts/DefaultFooter";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-light">
      <main className="h-[900px]">{children}</main>
      <DefaultFooter />
    </div>
  );
}
