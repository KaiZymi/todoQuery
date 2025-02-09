import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";

export const useTodoList = () => {
  const { data: todoItems, error, isLoading, refetch } = useQuery({
    ...todoListApi.getTodoListQueryOptions(),
    select: data => [...data].reverse()
  });

  return { error, todoItems, isLoading, refetch };
};
