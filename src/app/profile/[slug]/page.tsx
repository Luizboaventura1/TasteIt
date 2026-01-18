"use client";

import UserIcon from "@/assets/images/user-icon.svg";
import RecipeFormModal from "@/components/features/RecipeFormModal";
import PlusIcon from "@/components/icons/PlusIcon";
import DefaultFooter from "@/components/layouts/DefaultFooter";
import BackButton from "@/components/ui/BackButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import PrimaryText from "@/components/ui/PrimaryText";
import RecipeCard from "@/components/ui/RecipeCard";
import SecondaryText from "@/components/ui/SecondaryText";
import Skeleton from "@/components/ui/Skeleton";
import QUERY_KEYS from "@/constants/queryKeys";
import AuthService from "@/services/authService";
import RecipeService from "@/services/recipeService";
import UserService from "@/services/userService";
import getFirstAndLastName from "@/utils/getFirstAndLastName";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const params = useParams();
  const profileUserId = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? "";

  const userService = new UserService();
  const authService = new AuthService();
  const recipeService = new RecipeService(authService);

  const userQuery = useQuery({
    queryKey: [QUERY_KEYS.PROFILE(profileUserId)],
    queryFn: async () => userService.getUserDataById(profileUserId),
  });

  const recipeQuery = useQuery({
    queryKey: [QUERY_KEYS.USER_RECIPES(profileUserId)],
    queryFn: async () => recipeService.getAllUserRecipes(profileUserId),
  });

  const isOwnProfile = authService.tryGetUserId() === profileUserId;
  const hasUserRecipes = recipeQuery?.data && recipeQuery.data.length > 0;

  return (
    <>
      <section className="container mx-auto px-4 pt-12 md:pt-16 min-h-screen pb-10">
        <nav className="flex justify-end pb-8">
          <BackButton>Voltar</BackButton>
        </nav>

        <main className="w-full max-w-xl mx-auto space-y-4">
          <header className="flex justify-center">
            {userQuery.isLoading ? (
              <Skeleton className="w-24 h-24 rounded-full" />
            ) : userQuery.data ? (
              <>
                {userQuery.data?.photoURL ? (
                  <Image
                    className="w-24 h-24 border border-muted rounded-full"
                    src={userQuery.data.photoURL}
                    alt="Foto de perfil do usuário"
                    width={200}
                    height={200}
                    priority
                  />
                ) : (
                  <Image
                    className="w-24 h-24"
                    src={UserIcon}
                    alt="Ícone de usuário padrão"
                    width={200}
                    height={200}
                    priority
                  />
                )}
              </>
            ) : (
              <Image
                className="w-24 h-24"
                src={UserIcon}
                alt="Ícone de usuário padrão - perfil não encontrado"
                width={200}
                height={200}
                priority
              />
            )}
          </header>

          <section className="flex justify-center">
            {userQuery.isLoading ? (
              <div className="space-y-2">
                <Skeleton className="w-28 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>
            ) : userQuery.data ? (
              <PrimaryText>{getFirstAndLastName(userQuery.data?.name)}</PrimaryText>
            ) : (
              <PrimaryText>Perfil não disponível</PrimaryText>
            )}
          </section>

          <section className="my-8">
            <div className="flex justify-between items-center gap-4">
              <PrimaryText size="lg">Receitas</PrimaryText>
              {isOwnProfile && (
                <PrimaryButton onClick={() => setShowAddRecipeModal(true)} size="sm">
                  <PlusIcon size="sm" />
                  Criar receita
                </PrimaryButton>
              )}
            </div>
            <div className="bg-muted h-[1px] mt-2"></div>
          </section>

          {userQuery.isLoading ? (
            <>
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </>
          ) : userQuery.isError ? (
            <div className="text-center">
              <SecondaryText>Erro ao carregar o perfil</SecondaryText>
            </div>
          ) : userQuery.data ? (
            hasUserRecipes ? (
              recipeQuery.data!.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  title={recipe.title}
                  image={recipe.imageUrl}
                  author={recipe.author}
                  authorId={recipe.userId}
                />
              ))
            ) : (
              <div className="text-center">
                <SecondaryText>Nenhuma receita criada</SecondaryText>
              </div>
            )
          ) : (
            <div className="text-center">
              <SecondaryText>Não foi possível encontrar este perfil.</SecondaryText>
            </div>
          )}
        </main>
      </section>

      <DefaultFooter />

      <RecipeFormModal
        mode="create"
        closeModal={() => setShowAddRecipeModal(false)}
        isOpen={showAddRecipeModal}
      />
    </>
  );
}
