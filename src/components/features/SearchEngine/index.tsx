"use client";

import { useState, useRef, useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

import RecipeCategory from "@/enums/RecipeCategory";
import Recipe from "@/interfaces/Recipe";

const mockRecipes: Recipe[] = [
  {
    id: Math.floor(Math.random() * 100).toString(),
    userId: "user_001",
    imageUrl: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg",
    author: "João Silva",
    title: "Macarrão à Bolonhesa",
    description: "Um clássico italiano com molho de carne bem temperado.",
    category: RecipeCategory.GLUTEN_FREE,
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.floor(Math.random() * 100).toString(),
    userId: "user_002",
    imageUrl: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg",
    author: "Maria Oliveira",
    title: "Salada Caesar",
    description: "Salada com alface, frango grelhado, croutons e molho caseiro.",
    category: RecipeCategory.BURGER,
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.floor(Math.random() * 100).toString(),
    userId: "user_003",
    imageUrl: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg",
    author: "Carlos Andrade",
    title: "Bolo de Chocolate",
    description: "Bolo fofinho e úmido com cobertura de ganache.",
    category: RecipeCategory.DESSERT,
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.floor(Math.random() * 100).toString(),
    userId: "user_004",
    imageUrl: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg",
    author: "Ana Paula",
    title: "Panquecas Americanas",
    description: "Panquecas fofas servidas com mel e frutas.",
    category: RecipeCategory.BREAKFAST,
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.floor(Math.random() * 100).toString(),
    userId: "user_005",
    imageUrl: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg",
    author: "Fernanda Costa",
    title: "Sopa de Abóbora",
    description: "Sopa cremosa de abóbora com toque de gengibre.",
    category: RecipeCategory.APPETIZERS,
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.floor(Math.random() * 100).toString(),
    userId: "user_006",
    imageUrl: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg",
    author: "Lucas Rocha",
    title: "Tigela de Frutas",
    description: "Mix de frutas frescas com iogurte e granola.",
    category: RecipeCategory.BBQ,
    createdAt: new Date().toISOString(),
  },
];

export default function SearchEngine() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchedItems] = useState<Recipe[]>(mockRecipes);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedRecipe = (recipe: Recipe) => {
    console.log(recipe);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative max-w-lg w-full mx-auto">
      <SearchBar
        value={query}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
      />

      <SearchResults
        searchedItems={searchedItems}
        isOpen={isOpen}
        setQuery={setQuery}
        setIsOpen={setIsOpen}
        selectedRecipe={selectedRecipe}
      />
    </div>
  );
}
