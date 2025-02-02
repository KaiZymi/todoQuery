import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery
} from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import { useCallback, useRef, useState } from "react";

export const TodoList = () => {
  const [enabled, setEnabled] = useState(false);
  const {
    data: todoItems,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPlaceholderData
  } = useInfiniteQuery({
    queryKey: ["tasks", "list"],
    queryFn: meta => todoListApi.getLogoList({ page: meta.pageParam }, meta),
    // placeholderData: keepPreviousData, только если пагинация данных
    enabled: enabled,
    initialPageParam: 1,
    getNextPageParam: result => result.next,
    select: result => result.pages.flatMap(page => page.data)
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className={"p-5 mx-auto max-w-[800px] text-center"}>
      <button
        onClick={() => setEnabled(e => !e)}
        className="p-3  rounded border border-teal-500 cursor-pointer"
      >
        Загрузить данные
      </button>
      <div className={isPlaceholderData ? " opacity-50" : " "}>
        {todoItems?.map(todo => (
          <div className="p-4 border border-slate-300 mb-2" key={todo.id}>
            {todo.text}
          </div>
        ))}
      </div>

      <div ref={cursorRef}>
        {!hasNextPage && <div>Вы просмотрели все данные</div>}
        {isFetchingNextPage && <div>...Loading</div>}
      </div>
    </div>
  );
};

export function useIntersection(onIntersect: () => void) {
  const unsubscribe = useRef(() => {}); // в реакт 19 useCallback поддерживают очистку как в useEffect

  return useCallback((el: HTMLDivElement | null) => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(intersection => {
        if (intersection.isIntersecting) {
          onIntersect();
        }
      });
    });

    if (el) {
      observer.observe(el);
      unsubscribe.current = () => observer.disconnect();
    } else {
      unsubscribe.current();
    }
  }, []);
}
