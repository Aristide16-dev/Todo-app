import { Trash } from "lucide-react";

type Priority = "Basse" | "Moyenne" | "Urgente";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};
type Props = {
  todo: Todo;
  onDelete: () => void;
  isSelected: boolean;
  onToggle: (id: number) => void;
};

const TodoItem = ({ todo, onDelete, isSelected, onToggle }: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center  w-full">
        <div className="flex justify-center items-center ">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={isSelected}
            onChange={() => onToggle(todo.id)}
          />
          <p className="p-2 text-md font-bold">{todo.text}</p>
          <span className="p-2 text-sm">
            <span
              className={`${todo.priority === "Urgente" ? "badge badge-error badge-sm" : todo.priority === "Moyenne" ? "badge badge-warning badge-sm" : "badge badge-success badge-sm"}`}
            >
              {todo.priority}
            </span>
          </span>
        </div>
        <div
          className="bg-red-500 w-7 h-7 rounded-sm flex items-center justify-center cursor-pointer"
          onClick={onDelete}
        >
          <Trash className="w-5 h-5 " />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
