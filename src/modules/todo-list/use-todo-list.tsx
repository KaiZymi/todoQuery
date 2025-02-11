import { useSuspenseQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import { useSuspenseUser } from "../auth/useUser.ts";

export const useTodoList = () => {
  const user = useSuspenseUser();
  const { data: todoItems, refetch } = useSuspenseQuery({
    ...todoListApi.getTodoListQueryOptions({ userId: user.data.id }),
    select: data => [...data].reverse()
  });

  return { todoItems, refetch };
};
