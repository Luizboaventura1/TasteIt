import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "@/services/authService";
import DatabaseService from "@/services/databaseService";
import UserData from "@/interfaces/UserData";

const authService = new AuthService();
const databaseService = new DatabaseService();

export type UserState = {
  user: UserData | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const loginWithGoogle = createAsyncThunk<UserData, void, { rejectValue: string }>(
  "user/loginWithGoogle",
  async (_, thunkAPI) => {
    try {
      const googleUserData = await authService.loginWithGoogle();

      if (googleUserData instanceof Error) {
        return thunkAPI.rejectWithValue(googleUserData.message);
      }

      const { uid, displayName, email, photoURL } = googleUserData;

      if (!displayName || !email || !photoURL) {
        return thunkAPI.rejectWithValue("Dados do usuário do Google incompletos.");
      }

      const userExists = await databaseService.checkUserExists(uid);

      if (userExists instanceof Error) {
        return thunkAPI.rejectWithValue(userExists.message);
      }

      if (userExists) {
        const existingUser = await databaseService.getUserData(uid);

        if (existingUser instanceof Error) {
          return thunkAPI.rejectWithValue(existingUser.message);
        }

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

      const creationResult = await databaseService.createUser(newUser);
      if (creationResult instanceof Error) {
        return thunkAPI.rejectWithValue(creationResult.message);
      }

      return newUser;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Um erro inesperado ocorreu.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signOut = createAsyncThunk<void, void, { rejectValue: string }>(
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload ?? "Erro ao fazer login";
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro ao fazer logout";
      });
  },
});

export default userSlice.reducer;
