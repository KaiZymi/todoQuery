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

export type UserDto = {
  id: string;
  login: string;
  password: string;
};

export const authApi = {
  baseKey: "users",

  getUserByIdQueryOptions: (id: string) => {
    return queryOptions({
      queryKey: [authApi.baseKey, "buId", id],
      queryFn: meta =>
        jsonApiInstance<UserDto>(`/users/${id}`, {
          signal: meta.signal // сигнал если запрос не нужен
        }),
      placeholderData: keepPreviousData
    });
  },

  loginUserQueryOptions: (login: string, password: string) => {
    return jsonApiInstance<UserDto[]>(
      `/users?login=${login}&password-${password}`,
      {}
    ).then(r => r[0] as UserDto | undefined);
  }
};
