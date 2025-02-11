import { useTodoList } from "./use-todo-list.tsx";
import { useDeleteTodo } from "./use-delete-todo.ts";
import { useToggleTodo } from "./use-toggle-todo.ts";
import { useCreateTodo } from "./use-create-todo.ts";
import { useSuspenseUser } from "../auth/useUser.ts";

export const TodoList = () => {
  const { todoItems } = useTodoList();
  const { data: user } = useSuspenseUser();
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const { toggleTodo } = useToggleTodo();

  return (
    <div className={"p-5 mx-auto max-w-[800px] text-center"}>
      <h1 className="text-3xl font-bold underline mb-5">
        TodoList {user.login}
      </h1>
      <form
        action=""
        className="flex gap-2 mb-5"
        onSubmit={createTodo.handleSubmit}
      >
        <input
          className="rounded p-2 border border-teal-500"
          type="text"
          name="text"
        />
        <button
          disabled={createTodo.isLoading}
          className="rounded p-2 border border-teal-500 disabled:opacity-50"
        >
          Создать
        </button>
      </form>

      <div>
        {todoItems?.map(todo => (
          <div
            className="p-4 border border-slate-300 mb-2 flex justify-between"
            key={todo.id}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id, todo.done)}
            />
            {todo.text}
            <button
              disabled={deleteTodo.getIsPending(todo.id)}
              className="text-rose-500 p-3 disabled:text-rose-300"
              onClick={() => deleteTodo.handleDelete(todo.id)}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
