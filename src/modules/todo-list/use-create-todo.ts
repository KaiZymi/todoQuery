import React from "react";
import { useAppDispatch } from "../../shared/redux.ts";
import { createTodoThunk, useCreateTodoLoading } from "./create-todo-think.ts";

export function useCreateTodo() {
  const appDispatch = useAppDispatch();
  const isLoading = useCreateTodoLoading();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = String(formData.get("text") ?? "");
    appDispatch(createTodoThunk(text));

    e.currentTarget.reset();
  };

  return { handleSubmit, isLoading };
}
