import { AppThunk } from "../../shared/redux.ts";
import { queryClient } from "../../shared/api/query-client.ts";
import { authSlice } from "./auth.slice.ts";

export const logoutThunk = (): AppThunk => async (dispatch, _) => {
  try {
    dispatch(authSlice.actions.removeUser());

    queryClient.removeQueries();
    localStorage.removeItem("userId");
  } catch (e) {
    console.error(e);
  }
};
