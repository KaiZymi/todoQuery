import { AppThunk } from "../../shared/redux.ts";
import { MutationObserver, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../shared/api/query-client.ts";
import { authApi } from "./api.ts";
import { authSlice } from "./auth.slice.ts";

export const loginThunk = (login: string, password: string): AppThunk => async (
  dispatch,
  _
) => {
  try {
    const user = await new MutationObserver(queryClient, {
      mutationFn: authApi.loginUserQueryOptions
    }).mutate({
      login,
      password
    });

    if (user) {
      dispatch(
        authSlice.actions.addUser({
          userId: user.id
        })
      );

      queryClient.setQueryData(
        authApi.getUserByIdQueryOptions(user.id).queryKey,
        user
      );

      localStorage.setItem("userId", user.id);
    }

    dispatch(authSlice.actions.setError("Пароль или Логин не верные "));
  } catch (e) {
    console.error(e);
  }
};

export const useLoginLoading = () =>
  useMutation({
    mutationKey: ["login"]
  }).isPending;
