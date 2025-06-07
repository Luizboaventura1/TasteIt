"use client";

import Recipe from "@/interfaces/Recipe";
import Image from "next/image";

interface SearchResultsProps {
  searchedItems: Recipe[];
  isOpen: boolean;
  setQuery: (query: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  selectedRecipe: (recipe: Recipe) => void;
}

export default function SearchResults({
  searchedItems,
  isOpen,
  setQuery,
  setIsOpen,
  selectedRecipe,
}: SearchResultsProps) {
  return (
    <>
      {isOpen && (
        <div className="absolute z-40 mt-2 w-full bg-light rounded-lg shadow-lg overflow-auto">
          {searchedItems.length > 0 ? (
            searchedItems.map((recipe: Recipe) => (
              <div
                key={recipe.id}
                className="flex gap-4 items-center px-4 py-2 hover:bg-muted/15 cursor-pointer"
                onClick={() => {
                  setQuery(recipe.title);
                  setIsOpen(false);
                  selectedRecipe(recipe);
                }}
              >
                <Image
                  className="w-12 h-12 rounded-md object-cover"
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  width={48}
                  height={48}
                />
                {recipe.title}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-muted-dark">Nenhuma receita encontrada</div>
          )}
        </div>
      )}
    </>
  );
}
