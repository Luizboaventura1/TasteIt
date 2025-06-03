import UserState from "./types/UserState";
import { handleLoginWithGoogleCases } from "./thunks/loginWithGoogle";
import { handleAddRecipeCases } from "./thunks/addRecipe";
import { handleSignOutCases } from "./thunks/signOut";
import { createSlice } from "@reduxjs/toolkit";

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
