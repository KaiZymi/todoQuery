import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions
} from "@tanstack/react-query";
import { jsonApiInstance } from "../../shared/api/api-instance.ts";

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  items: number;
  last: number | null;
  next: number | null;
  pages: number;
  prev: number | null;
};

export type TodoDto = {
  id: string;
  text: string;
  done: boolean;
  userId: string;
};

export const todoListApi = {
  baseKey: "tasks",

  getTodoListQueryOptions: () => {
    return queryOptions({
      queryKey: [todoListApi.baseKey, "list"],
      queryFn: meta =>
        jsonApiInstance<TodoDto[]>(`/tasks`, {
          signal: meta.signal
        }),
      placeholderData: keepPreviousData
    });
  },

  getTodoListInfinityQueryOptions: ({
    pageSize = 10
  }: {
    pageSize?: number;
  }) => {
    return infiniteQueryOptions({
      queryKey: [todoListApi.baseKey, "list"],
      queryFn: meta =>
        jsonApiInstance<PaginatedResult<TodoDto>>(
          `/tasks?_page=${meta.pageParam}_&per_page=${pageSize}`,
          {
            signal: meta.signal
          }
        ),
      initialPageParam: 1,
      getNextPageParam: result => result.next,
      select: result => result.pages.flatMap(page => page.data)
    });
  },

  createTodo: (data: TodoDto) => {
    return jsonApiInstance<TodoDto>(`/tasks`, {
      method: "POST",
      json: data
    });
  },

  updateTodo: (data: Partial<TodoDto> & { id: string }) => {
    return jsonApiInstance<TodoDto>(`/tasks/${data.id}`, {
      method: "PATCH",
      json: data
    });
  },

  deleteTodo: (id: string) => {
    return jsonApiInstance(`/tasks/${id}`, {
      method: "DELETE"
    });
  }
};
