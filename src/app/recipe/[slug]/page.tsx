"use client";

import EditIcon from "@/components/icons/EditIcon";
import BackButton from "@/components/ui/BackButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import PrimaryText from "@/components/ui/PrimaryText";
import RichTextEditor from "@/components/ui/RichTextEditor";
import Skeleton from "@/components/ui/Skeleton";
import type Recipe from "@/interfaces/Recipe";
import AuthService from "@/services/authService";
import RecipeService from "@/services/recipeService";
import { RootState } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Recipe() {
  const params = useParams();
  const recipeId = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const authService = new AuthService();
  const recipeService = new RecipeService(authService);
  const user = useSelector((state: RootState) => state.user)?.user || null;
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await recipeService.getRecipeById(recipeId as string);
      setCurrentRecipe(recipe);
    };

    getRecipe();
  }, []);

  if(!currentRecipe) {
    return <div>receita não encontrada</div>
  }

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <nav className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-24">
        <section className="space-y-4">
          <PrimaryText size="lg">Cupcake com cereja</PrimaryText>

          <div className="max-w-[600px] w-full aspect-[3/2] mx-auto overflow-hidden rounded-2xl">
            {currentRecipe ? (
              <Image
                className="object-cover w-full h-full"
                src={currentRecipe.imageUrl}
                alt="Img"
                width={600}
                height={400}
              />
            ) : (
              <Skeleton className="h-full w-[600px] rounded-xl" />
            )}
          </div>

          {currentRecipe ? (
            <cite className="text-sm text-dark/80 hover:text-dark border-b-2 border-transparent hover:border-dark">
              <Link href={`/profile/${currentRecipe?.userId}`}>
                Feito por {currentRecipe?.author}
              </Link>
            </cite>
          ) : (
            <Skeleton className="h-5 w-36" />
          )}
        </section>

        <section className="flex justify-end items-start">
          <BackButton>Voltar</BackButton>
        </section>
      </nav>

      <section className="flex justify-between items-center mt-20 mb-12">
        <PrimaryText size="lg">Descrição da receita</PrimaryText>
        {currentRecipe && user?.id === currentRecipe?.userId && (
          <PrimaryButton size="sm">
            <EditIcon /> Editar
          </PrimaryButton>
        )}
      </section>

      {currentRecipe ? (
        <RichTextEditor showToolbar={false} content={currentRecipe.description} editable={false} />
      ) : (
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-1/3" />
        </div>
      )}
    </div>
  );
}
