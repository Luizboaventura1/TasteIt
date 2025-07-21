"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeUserState } from "@/store/User/userReducer";
import { auth } from "@/lib/firebase/firebase.config";
import DatabaseService from "@/services/databaseService";
import type { AppDispatch } from "@/store";
import RecipeService from "@/services/recipeService";
import AuthService from "@/services/authService";
import toDate from "@/utils/toDate";

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      try {
        const databaseService = new DatabaseService();
        const userData = await databaseService.getUserDataById(user.uid);
        const allUserRecipes = await new RecipeService(new AuthService())
          .getAllUserRecipes(userData.id)
          .then((recipes) =>
            recipes.map((recipe) => ({
              ...recipe,
              createdAt: toDate(recipe.createdAt)?.toISOString(),
            }))
          );

        dispatch(initializeUserState({ ...userData, recipes: allUserRecipes ?? [] }));
      } catch (error) {
        console.error(
          "Erro ao carregar dados do usuário:",
          error instanceof Error ? error.message : "Erro desconhecido"
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}