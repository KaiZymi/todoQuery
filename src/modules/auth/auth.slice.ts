import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "../../shared/redux.ts";

type AuthState = {
  userId: string | undefined;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: localStorage.getItem("userId")
  } as AuthState,
  selectors: {
    userId: state => state.userId
  },
  reducers: {
    addUser(state, action: PayloadAction<{ userId: string }>) {
      localStorage.setItem("userId", action.payload.userId); // Я так делаю, потому что это мок для простоты, по хорошему это делать в санке
      state.userId = action.payload.userId;
    },
    removeUser(state) {
      state.userId = undefined;
    }
  }
}).injectInto(rootReducer);
