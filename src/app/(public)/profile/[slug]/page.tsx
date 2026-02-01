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
import RecipeStatus from "@/enums/RecipeStatus";
import getFirstAndLastName from "@/utils/getFirstAndLastName";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";

export default function Profile() {
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const params = useParams();
  const profileUserId = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? "";

  const userService = useMemo(() => new UserService(), []);
  const authService = useMemo(() => new AuthService(), []);
  const recipeService = useMemo(() => new RecipeService(authService), [authService]);

  const userQuery = useQuery({
    queryKey: [QUERY_KEYS.PROFILE(profileUserId)],
    queryFn: async () => userService.getUserDataById(profileUserId),
    refetchOnWindowFocus: false,
  });

  const recipeQuery = useQuery({
    queryKey: [QUERY_KEYS.USER_RECIPES(profileUserId)],
    queryFn: async () => recipeService.getAllUserRecipes(profileUserId),
    refetchOnWindowFocus: false,
  });

  const isOwnProfile = authService.tryGetUserId() === profileUserId;
  const hasUserRecipes = Boolean(recipeQuery?.data && recipeQuery.data.length > 0);

  const groupedRecipes = useMemo(() => {
    const list = recipeQuery.data ?? [];
    const approved = list.filter((r) => r.status === RecipeStatus.APPROVED);
    const pending = list.filter((r) => r.status === RecipeStatus.PENDING);
    const rejected = list.filter((r) => r.status === RecipeStatus.REJECTED);
    return { approved, pending, rejected, all: list };
  }, [recipeQuery.data]);

  const hasApproved = groupedRecipes.approved.length > 0;
  const hasPending = groupedRecipes.pending.length > 0;
  const hasRejected = groupedRecipes.rejected.length > 0;

  // Show tabs except when the user has only approved recipes
  const showTabs = !(hasApproved && !hasPending && !hasRejected);

  const tabs = {
    recipes: "Receitas",
    pending: "Pendentes",
    rejected: "Rejeitadas",
  };

  const [activeTab, setActiveTab] = useState("recipes");

  const renderAvatar = () => {
    if (userQuery.isLoading) return <Skeleton className="w-24 h-24 rounded-full" />;
    if (userQuery.data?.photoURL)
      return (
        <Image
          className="w-24 h-24 border border-muted rounded-full"
          src={userQuery.data.photoURL}
          alt="Foto de perfil do usuário"
          width={200}
          height={200}
          priority
        />
      );

    return (
      <Image
        className="w-24 h-24"
        src={UserIcon}
        alt={
          userQuery.data
            ? "Ícone de usuário padrão"
            : "Ícone de usuário padrão - perfil não encontrado"
        }
        width={200}
        height={200}
        priority
      />
    );
  };

  const renderName = () => {
    if (userQuery.isLoading)
      return (
        <div className="space-y-2">
          <Skeleton className="w-28 h-4" />
          <Skeleton className="w-16 h-4" />
        </div>
      );

    if (userQuery.data)
      return <PrimaryText>{getFirstAndLastName(userQuery.data?.name)}</PrimaryText>;

    return <PrimaryText>Perfil não disponível</PrimaryText>;
  };

  const renderRecipesSection = () => {
    if (activeTab !== "recipes") return null;

    if (userQuery.isLoading)
      return (
        <>
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </>
      );

    if (userQuery.isError)
      return (
        <div className="text-center">
          <SecondaryText>Erro ao carregar o perfil</SecondaryText>
        </div>
      );

    if (!userQuery.data)
      return (
        <div className="text-center">
          <SecondaryText>Não foi possível encontrar este perfil.</SecondaryText>
        </div>
      );
    if (!hasUserRecipes)
      return (
        <div className="text-center">
          <SecondaryText>Nenhuma receita criada</SecondaryText>
        </div>
      );

    if (groupedRecipes.approved.length > 0)
      return (
        <>
          {groupedRecipes.approved.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipeId={recipe.id}
              title={recipe.title}
              image={recipe.imageUrl}
              author={recipe.author}
              authorId={recipe.userId}
            />
          ))}
        </>
      );

    return (
      <div className="text-center">
        <SecondaryText>Nenhuma receita aprovada ainda</SecondaryText>
      </div>
    );
  };

  const renderPendingSection = () => {
    if (activeTab !== "pending") return null;
    if (userQuery.isLoading)
      return (
        <>
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </>
      );
    if (!userQuery.data)
      return (
        <div className="text-center">
          <SecondaryText>Não foi possível encontrar este perfil.</SecondaryText>
        </div>
      );

    if (!hasUserRecipes)
      return (
        <div className="text-center">
          <SecondaryText>Nenhuma receita criada</SecondaryText>
        </div>
      );

    if (groupedRecipes.pending.length > 0)
      return (
        <>
          {groupedRecipes.pending.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipeId={recipe.id}
              title={recipe.title}
              image={recipe.imageUrl}
              author={recipe.author}
              authorId={recipe.userId}
            />
          ))}
        </>
      );

    return (
      <div className="text-center">
        <SecondaryText>Nenhuma receita pendente</SecondaryText>
      </div>
    );
  };

  const renderRejectedSection = () => {
    if (activeTab !== "rejected") return null;
    if (userQuery.isLoading)
      return (
        <>
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </>
      );
    if (!userQuery.data)
      return (
        <div className="text-center">
          <SecondaryText>Não foi possível encontrar este perfil.</SecondaryText>
        </div>
      );

    if (!hasUserRecipes)
      return (
        <div className="text-center">
          <SecondaryText>Nenhuma receita criada</SecondaryText>
        </div>
      );

    if (groupedRecipes.rejected.length > 0)
      return (
        <>
          {groupedRecipes.rejected.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipeId={recipe.id}
              title={recipe.title}
              image={recipe.imageUrl}
              author={recipe.author}
              authorId={recipe.userId}
            />
          ))}
        </>
      );

    return (
      <div className="text-center">
        <SecondaryText>Nenhuma receita rejeitada</SecondaryText>
      </div>
    );
  };

  const tabClasses: Record<string, { active: string; inactive: string }> = {
    recipes: { active: "font-medium bg-blue-500/30 text-blue-500", inactive: "text-dark" },
    pending: { active: "font-medium bg-yellow-500/30 text-yellow-600", inactive: "text-dark" },
    rejected: { active: "font-medium bg-red-500/30 text-red-500", inactive: "text-dark" },
  };

  return (
    <>
      <section className="container mx-auto px-4 pt-12 md:pt-16 min-h-screen pb-10">
        <nav className="flex justify-end pb-8">
          <BackButton>Voltar</BackButton>
        </nav>

        <main className="w-full max-w-2xl mx-auto space-y-4">
          <header className="flex justify-center">{renderAvatar()}</header>

          <section className="flex justify-center mb-8">{renderName()}</section>

          <section className="my-8">
            <div className="flex justify-between items-center gap-4">
              <div className="flex gap-2 items-center">
                {showTabs ? (
                  <>
                    <button
                      onClick={() => setActiveTab("recipes")}
                      className={`${
                        tabClasses.recipes[activeTab === "recipes" ? "active" : "inactive"]
                      } cursor-pointer px-3 py-2 transition-colors duration-300 rounded-lg`}
                    >
                      {tabs.recipes}
                    </button>
                    {hasPending && (
                      <button
                        onClick={() => setActiveTab("pending")}
                        className={`${
                          tabClasses.pending[activeTab === "pending" ? "active" : "inactive"]
                        } cursor-pointer px-3 py-2 transition-colors duration-300 rounded-lg`}
                      >
                        {tabs.pending}
                      </button>
                    )}
                    {hasRejected && (
                      <button
                        onClick={() => setActiveTab("rejected")}
                        className={`${
                          tabClasses.rejected[activeTab === "rejected" ? "active" : "inactive"]
                        } cursor-pointer px-3 py-2 transition-colors duration-300 rounded-lg`}
                      >
                        {tabs.rejected}
                      </button>
                    )}
                  </>
                ) : (
                  <PrimaryText>Receitas</PrimaryText>
                )}
              </div>
              {isOwnProfile && (
                <PrimaryButton onClick={() => setShowAddRecipeModal(true)} size="sm">
                  <PlusIcon size="sm" />
                  Enviar receita
                </PrimaryButton>
              )}
            </div>
            <div className="bg-muted h-[1px] mt-2"></div>
          </section>

          {renderRecipesSection()}

          {renderPendingSection()}

          {renderRejectedSection()}
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
