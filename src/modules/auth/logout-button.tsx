import { useAppDispatch } from "../../shared/redux.ts";
import { logoutThunk } from "./logout-thunk.ts";

export function LogoutButton() {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(logoutThunk())}
      className="border border-rose-500 p-3 rounded"
    >
      Выход
    </button>
  );
}
