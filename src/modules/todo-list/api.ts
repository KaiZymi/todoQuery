const BASE_URL = "http://localhost:3000";

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
  getLogoList: async (
    { page, pageSize = 10 }: { page: number; pageSize?: number },
    { signal }: { signal: AbortSignal }
  ) => {
    const res = await fetch(
      `${BASE_URL}/tasks?_page=${page}_&per_page=${pageSize}`,
      { signal }
    );
    return (await res.json()) as Promise<PaginatedResult<TodoDto>>;
  }
};
