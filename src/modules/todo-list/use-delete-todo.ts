import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import { useSuspenseUser } from "../auth/useUser.ts";

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  const user = useSuspenseUser();
  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey]
      });
    },

    async onSuccess(_, deletedId) {
      // const todos = queryClient.getQueryData(
      //   todoListApi.getTodoListQueryOptions().queryKey
      // );

      queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions({ userId: user.data.id }).queryKey,
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
