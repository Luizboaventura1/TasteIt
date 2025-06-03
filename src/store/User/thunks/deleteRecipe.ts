import AuthService from "@/services/authService";
import RecipeService from "@/services/recipeService";
import { ActionReducerMapBuilder, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ThunkRejectPayload from "../types/ThunkRejectPayload";
import UserState from "../types/UserState";

const authService = new AuthService();
const recipeService = new RecipeService(authService);

export const deleteRecipe = createAsyncThunk<string, string, ThunkRejectPayload>(
  "user/addRecipe",
  async (recipeId, thunkAPI) => {
    try {
      await recipeService.deleteRecipe(recipeId);

      return recipeId;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Um erro inesperado ocorreu.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const handleDeleteRecipeCases = (builder: ActionReducerMapBuilder<UserState>) => {
  builder
    .addCase(deleteRecipe.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteRecipe.fulfilled, (state, action: PayloadAction<string>) => {
      const recipeId = action.payload;

      if (state.user?.recipes) {
        state.user.recipes = [...state.user?.recipes].filter((recipe) => recipe.id !== recipeId);
      }

      state.loading = false;
    })
    .addCase(deleteRecipe.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload ?? "Erro ao remover a receita";
    });
};
