import Image from "next/image";
import SecondaryText from "./SecondaryText";
import PrimaryText from "./PrimaryText";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RecipeCardProps {
  recipeId: string;
  title: string;
  author: string;
  image?: string;
  authorId: string;
}

export default function RecipeCard({ recipeId, title, author, authorId, image }: RecipeCardProps) {

  const router = useRouter();
  const navigateToRecipePage = () => router.push(`/recipe/${recipeId}`);
  
  return (
    <div onClick={navigateToRecipePage} className="grid grid-cols-[1fr_auto] gap-3 bg-light shadow-md rounded-xl border border-muted h-full min-h-[140px] overflow-hidden cursor-pointer transition-all duration-300">
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
