"use client";

import RecipeCard from "@/components/ui/RecipeCard";
import SecondaryText from "@/components/ui/SecondaryText";
import Skeleton from "@/components/ui/Skeleton";
import recipeModerationService from "@/services/recipeModerationService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Dashboard() {
  const { data: pendingRecipes, isLoading: isLoadingRecipes, isError: isPendingRecipesError } = useQuery({
    queryKey: ["admin-pending-recipes"],
    queryFn: recipeModerationService.getPendingRecipes,
  });

  const {
    data: rejectedRecipes,
    isLoading: isLoadingRejectedRecipes,
    isError: isRejectedRecipesError,
  } = useQuery({
    queryKey: ["admin-rejected-recipes"],
    queryFn: recipeModerationService.getRejectedRecipes,
  });

  const hasPending = pendingRecipes && pendingRecipes.length > 0;
  const hasRejected = rejectedRecipes && rejectedRecipes.length > 0;

  const tabs = {
    pending: "Pendentes",
    rejected: "Rejeitadas",
  };

  const [activeTab, setActiveTab] = useState("pending");

  const renderPendingSection = () => {
    if (activeTab !== "pending") return null;
    if (isLoadingRecipes)
      return (
        <>
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </>
      );
    if (isPendingRecipesError)
      return (
        <div className="text-center">
          <SecondaryText>Erro ao carregar receitas pendentes.</SecondaryText>
        </div>
      );

    if (!hasPending)
      return (
        <div className="text-center">
          <SecondaryText>Nenhuma receita pendente</SecondaryText>
        </div>
      );

    if (pendingRecipes.length > 0)
      return (
        <>
          {pendingRecipes.map((recipe) => (
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
    if (isLoadingRejectedRecipes)
      return (
        <>
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </>
      );
    if (isRejectedRecipesError)
      return (
        <div className="text-center">
          <SecondaryText>Erro ao carregar receitas rejeitadas.</SecondaryText>
        </div>
      );

    if (!hasRejected)
      return (
        <div className="text-center">
          <SecondaryText>Nenhuma receita rejeitada </SecondaryText>
        </div>
      );

    if (rejectedRecipes.length > 0)
      return (
        <>
          {rejectedRecipes.map((recipe) => (
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
    pending: { active: "font-medium bg-yellow-500/30 text-yellow-600", inactive: "text-dark" },
    rejected: { active: "font-medium bg-red-500/30 text-red-500", inactive: "text-dark" },
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <nav className="py-4">
        <h1 className="font-medium text-xl">Admin Dashboard</h1>
      </nav>
      <section>
        <main className="w-full max-w-2xl mx-auto space-y-4">
          <section className="my-8">
            <div className="flex justify-between items-center gap-4">
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`${
                    tabClasses.pending[activeTab === "pending" ? "active" : "inactive"]
                  } cursor-pointer px-3 py-2 transition-colors duration-300 rounded-lg`}
                >
                  {tabs.pending}
                </button>

                <button
                  onClick={() => setActiveTab("rejected")}
                  className={`${
                    tabClasses.rejected[activeTab === "rejected" ? "active" : "inactive"]
                  } cursor-pointer px-3 py-2 transition-colors duration-300 rounded-lg`}
                >
                  {tabs.rejected}
                </button>
              </div>
            </div>
            <div className="bg-muted h-[1px] mt-2"></div>
          </section>
          {renderPendingSection()}

          {renderRejectedSection()}
        </main>
      </section>
    </div>
  );
}
