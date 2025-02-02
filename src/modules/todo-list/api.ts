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

type TodoDto = {
  id: string;
  text: string;
  done: boolean;
};

export const todoListApi = {
  getTodoListQueryOptions: ({
    page,
    pageSize = 10
  }: {
    page: number;
    pageSize?: number;
  }) => {
    return queryOptions({
      queryKey: ["tasks", "list", { page }],
      queryFn: meta =>
        jsonApiInstance<PaginatedResult<TodoDto>>(
          `/tasks?_page=${page}_&per_page=${pageSize}`,
          {
            signal: meta.signal
          }
        ),
      placeholderData: keepPreviousData
    });
  },

  getTodoListInfinityQueryOptions: ({
    pageSize = 10
  }: {
    pageSize?: number;
  }) => {
    return infiniteQueryOptions({
      queryKey: ["tasks", "list"],
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
  }
};
