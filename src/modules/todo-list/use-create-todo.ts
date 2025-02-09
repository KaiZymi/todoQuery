import React from "react";
import { nanoid } from "nanoid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey]
      });
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = String(formData.get("text") ?? "");
    createTodoMutation.mutate({
      id: nanoid(),
      done: false,
      text: text,
      userId: "1"
    });

    e.currentTarget.reset();
  };

  return { handleSubmit, isPending: createTodoMutation.isPending };
}
