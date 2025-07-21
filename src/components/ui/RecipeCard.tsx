import Image from "next/image";
import SecondaryText from "./SecondaryText";
import PrimaryText from "./PrimaryText";
import Link from "next/link";

interface RecipeCardProps {
  title: string;
  author: string;
  image?: string;
  authorId: string;
}

export default function RecipeCard({ title, author, authorId, image }: RecipeCardProps) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-3 rounded-xl border border-muted h-full min-h-[140px] overflow-hidden">
      <div className="grid grid-rows-[auto,1fr] p-4 min-h-[140px] text-start">
        <header>
          <PrimaryText className="text-sm sm:text-lg">{title}</PrimaryText>
        </header>
        <footer className="flex items-end">
          <cite className="text-dark text-sm">
            Feito por{" "}
            <Link
              className="border-b-2 border-dark/0 hover:border-dark"
              href={`/profile/${authorId}`}
            >
              {author}{" "}
            </Link>
          </cite>
        </footer>
      </div>
      <div className="flex justify-center items-center overflow-hidden min-h-[140px] bg-muted/40">
        {image ? (
          <Image
            className="w-[140px] h-[140px] object-cover"
            src={image}
            alt="Recipe image"
            width={400}
            height={400}
          />
        ) : (
          <SecondaryText className="p-3" size="sm">
            Sem imagem
          </SecondaryText>
        )}
      </div>
    </div>
  );
}
