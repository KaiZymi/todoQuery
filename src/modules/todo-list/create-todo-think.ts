import { AppThunk } from "../../shared/redux.ts";
import { MutationObserver, useMutation } from "@tanstack/react-query";
import { TodoDto, todoListApi } from "./api.ts";
import { queryClient } from "../../shared/api/query-client.ts";
import { nanoid } from "nanoid";
import { authSlice } from "../auth/auth.slice.ts";

export const createTodoThunk = (text: string): AppThunk => async (
  _dispatch,
  getState
) => {
  const userId = authSlice.selectors.userId(getState());

  if (!userId) {
    throw new Error("User not login");
  }

  const newTodo: TodoDto = {
    id: nanoid(),
    done: false,
    text,
    userId
  };

  await queryClient.cancelQueries({
    queryKey: [todoListApi.baseKey]
  });

  const prevTasks = queryClient.getQueryData(
    todoListApi.getTodoListQueryOptions().queryKey
  );

  queryClient.setQueryData(
    todoListApi.getTodoListQueryOptions().queryKey,
    tasks => [...(tasks ?? []), newTodo]
  );

  try {
    await new MutationObserver(queryClient, {
      mutationFn: todoListApi.createTodo
    }).mutate(newTodo);
  } catch (e) {
    queryClient.setQueryData(
      todoListApi.getTodoListQueryOptions().queryKey,
      prevTasks
    );
    console.error(e);
  } finally {
    await queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] });
  }
};

export const useCreateTodoLoading = () =>
  useMutation({
    mutationKey: ["create-todo"]
  }).isPending;
