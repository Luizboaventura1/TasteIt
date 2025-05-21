import { createSlice } from "@reduxjs/toolkit";

const initialState = {name: "Luiz"};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.name = action.payload
    },
  },
});

export const { setUsername } = userSlice.actions;
export default userSlice.reducer;
