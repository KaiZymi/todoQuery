import { authSlice } from "./auth.slice.ts";
import { store } from "../../shared/redux.ts";
import { queryClient } from "../../shared/api/query-client.ts";
import { authApi } from "./api.ts";

export const prefetchAuth = () => {
  const userId = authSlice.selectors.userId(store.getState());
  if (userId) {
    queryClient.prefetchQuery(authApi.getUserByIdQueryOptions(userId));
  }
};
