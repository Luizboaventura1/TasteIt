import { createAsyncThunk, ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import ThunkRejectPayload from "../types/ThunkRejectPayload";
import UserState from "../types/UserState";
import Recipe from "@/interfaces/Recipe";
import AuthService from "@/services/authService";
import RecipeService from "@/services/recipeService";

const authService = new AuthService();
const recipeService = new RecipeService(authService);

export const addRecipe = createAsyncThunk<
  Recipe,
  { data: Pick<Recipe, "title" | "description" | "category">, imageFile: File | null },
  ThunkRejectPayload
>("user/addRecipe", async ({ data, imageFile }, thunkAPI) => {
  try {
    const createdRecipe = await recipeService.addRecipe(data, imageFile);

    return {
      ...createdRecipe,
      createdAt:
        createdRecipe.createdAt instanceof Date
          ? createdRecipe.createdAt.toISOString()
          : createdRecipe.createdAt,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro ao adicionar receita.";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const handleAddRecipeCases = (builder: ActionReducerMapBuilder<UserState>) => {
  builder
    .addCase(addRecipe.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addRecipe.fulfilled, (state, action: PayloadAction<Recipe>) => {
      state.user?.recipes.push(action.payload);
      state.loading = false;
    })
    .addCase(addRecipe.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload ?? "Erro ao adicionar receita";
    });
};
