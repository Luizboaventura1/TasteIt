import SearchEngine from "@/components/features/SearchEngine"

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center bg-light">
      <div className="w-full max-w-md">
        <SearchEngine />
      </div>
    </div>
  );
}
