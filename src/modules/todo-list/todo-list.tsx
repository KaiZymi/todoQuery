import { useTodoList } from "./use-todo-list.tsx";
import { useMutation } from "@tanstack/react-query";
import { todoListApi } from "./api.ts";
import { nanoid } from "nanoid";

export const TodoList = () => {
  const { todoItems, isLoading, error, cursor } = useTodoList();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const text = String(formData.get("text") ?? "");
    createTodoMuration.mutate({
      id: nanoid(),
      done: false,
      text: text,
      userId: "1"
    });

    e.currentTarget.reset();
  };

  return (
    <div className={"p-5 mx-auto max-w-[800px] text-center"}>
      <form action="" className="flex gap-2 mb-5" onSubmit={handleSubmit}>
        <input
          className="rounded p-2 border border-teal-500"
          type="text"
          name="text"
        />
        <button className="rounded p-2 border border-teal-500"></button>
      </form>

      <div>
        {todoItems?.map(todo => (
          <div className="p-4 border border-slate-300 mb-2" key={todo.id}>
            {todo.text}
          </div>
        ))}
      </div>
      {cursor}
    </div>
  );
};
