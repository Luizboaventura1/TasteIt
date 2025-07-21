import { createSlice } from "@reduxjs/toolkit";
import { handleAddRecipeCases } from "./thunks/addRecipe";
import { handleLoginWithGoogleCases } from "./thunks/loginWithGoogle";
import { handleSignOutCases } from "./thunks/signOut";
import UserState from "./types/UserState";

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUserState(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    handleLoginWithGoogleCases(builder);
    handleAddRecipeCases(builder);
    handleSignOutCases(builder);
  },
});

export const { initializeUserState } = userSlice.actions;
export default userSlice.reducer;
