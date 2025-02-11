import { TodoList } from "../modules/todo-list/todo-list.tsx";
import { useUser } from "../modules/auth/useUser.ts";
import { Login } from "../modules/auth/login.tsx";
import { LogoutButton } from "../modules/auth/logout-button.tsx";
import { prefetchTodoList } from "../modules/todo-list/prefetch-todo-list.ts";
import { prefetchAuth } from "../modules/auth/prefetch-auth.ts";
import { useLayoutEffect } from "react";

export function App() {
  useLayoutEffect(() => {
    prefetchAuth();
  }, []);

  const user = useUser();

  if (user.isLoading) {
    return <div>Loading</div>;
  }

  if (user.data) {
    prefetchTodoList();
    return (
      <>
        <LogoutButton />
        <TodoList />
      </>
    );
  }

  return <Login />;
}
