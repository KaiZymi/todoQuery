import { authSlice } from "../auth/auth.slice.ts";
import { store } from "../../shared/redux.ts";
import { queryClient } from "../../shared/api/query-client.ts";
import { authApi } from "../auth/api.ts";
import { todoListApi } from "./api.ts";

export const prefetchTodoList = () => {
  const userId = authSlice.selectors.userId(store.getState());
  if (userId) {
    queryClient.prefetchQuery(authApi.getUserByIdQueryOptions(userId));
    queryClient.prefetchQuery(todoListApi.getTodoListQueryOptions({ userId }));
  }
};
