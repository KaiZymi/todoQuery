import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    async onSettled() {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey]
      });
    },

    async onSuccess(_, deletedId) {
      // const todos = queryClient.getQueryData(
      //   todoListApi.getTodoListQueryOptions().queryKey
      // );

      queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
        todos => todos?.filter(todo => todo.id !== deletedId)
      );
    }
  });

  return {
    handleDelete: deleteTodoMutation.mutate,
    getIsPending: (id: string) =>
      deleteTodoMutation.isPending && deleteTodoMutation.variables === id
  };
}
