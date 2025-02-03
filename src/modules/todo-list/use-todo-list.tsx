import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";

export const useTodoList = () => {
  const { data: todoItems, error, isLoading } = useQuery({
    ...todoListApi.getTodoListQueryOptions(),
    select: data => data.toReversed()
  });

  return { error, todoItems, isLoading };
};

// export const useTodoList = () => {
//   const {
//     data: todoItems,
//     error,
//     isLoading,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage
//   } = useInfiniteQuery({
//     ...todoListApi.getTodoListInfinityQueryOptions({})
//   });
//
//   const cursorRef = useIntersection(() => {
//     fetchNextPage();
//   });
//
//   const cursor = (
//     <div ref={cursorRef}>
//       {!hasNextPage && <div>Вы просмотрели все данные</div>}
//       {isFetchingNextPage && <div>...Loading</div>}
//     </div>
//   );
//
//   return { error, todoItems, isLoading, cursor };
// };

// export function useIntersection(onIntersect: () => void) {
//   const unsubscribe = useRef(() => {}); // в реакт 19 useCallback поддерживают очистку как в useEffect
//
//   return useCallback((el: HTMLDivElement | null) => {
//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(intersection => {
//         if (intersection.isIntersecting) {
//           onIntersect();
//         }
//       });
//     });
//
//     if (el) {
//       observer.observe(el);
//       unsubscribe.current = () => observer.disconnect();
//     } else {
//       unsubscribe.current();
//     }
//   }, []);
// }
