import { createAsyncThunk, ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import ThunkRejectPayload from "../types/ThunkRejectPayload";
import UserState from "../types/UserState";
import AuthService from "@/services/authService";

const authService = new AuthService();

export const signOut = createAsyncThunk<void, void, ThunkRejectPayload>(
  "user/signOut",
  async (_, thunkAPI) => {
    try {
      await authService.signOut();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Um erro inesperado ocorreu.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const handleSignOutCases = (builder: ActionReducerMapBuilder<UserState>) => {
  builder
    .addCase(signOut.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signOut.fulfilled, (state) => {
      state.user = null;
      state.loading = false;
    })
    .addCase(signOut.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload ?? "Erro ao fazer logout";
    });
};