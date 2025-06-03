import { createAsyncThunk, ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import UserData from "@/interfaces/UserData";
import ThunkRejectPayload from "../types/ThunkRejectPayload";
import AuthService from "@/services/authService";
import DatabaseService from "@/services/databaseService";
import StoreUser from "../types/StoreUser";
import UserState from "../types/UserState";

const authService = new AuthService();
const databaseService = new DatabaseService();

export const loginWithGoogle = createAsyncThunk<UserData, void, ThunkRejectPayload>(
  "user/loginWithGoogle",
  async (_, thunkAPI) => {
    try {
      const googleUserData = await authService.loginWithGoogle();
      const { uid, displayName, email, photoURL } = googleUserData;

      if (!displayName || !email || !photoURL) {
        throw new Error("Dados do usuário do Google incompletos.");
      }

      const userExists = await databaseService.checkUserExists(uid);

      if (userExists) {
        const existingUser = await databaseService.getUserData(uid);
        return existingUser;
      }

      const newUser: UserData = {
        id: uid,
        name: displayName,
        email,
        photoURL,
        favoriteRecipes: [],
        instagramLink: "",
      };

      await databaseService.createUser(newUser);

      return newUser;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro inesperado.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const handleLoginWithGoogleCases = (builder: ActionReducerMapBuilder<UserState>) => {
  builder
    .addCase(loginWithGoogle.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginWithGoogle.fulfilled, (state, action: PayloadAction<UserData>) => {
      const formattedUser: StoreUser = {
        ...action.payload,
        recipes: [],
      };
      state.user = formattedUser;
      state.loading = false;
    })
    .addCase(loginWithGoogle.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload ?? "Erro ao fazer login";
    });
};
