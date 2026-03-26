import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import { Construction } from "lucide-react";

type Priority = "Basse" | "Moyenne" | "Urgente";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

function App() {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("Moyenne");

  // Gestion sécurisée des todos depuis localStorage
  let initialTodo: Todo[] = [];
  try {
    const savedTodos = localStorage.getItem("todos");
    const parsed = savedTodos ? JSON.parse(savedTodos) : [];
    if (Array.isArray(parsed)) initialTodo = parsed;
  } catch (err) {
    initialTodo = [];
  }
  const [todos, setTodos] = useState<Todo[]>(initialTodo);
  const [filter, setFilter] = useState<Priority | "Tous">("Tous");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  function addTodo() {
    if (input.trim() === "") {
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority,
    };
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setInput("");
    setPriority("Moyenne");
  }

  let filteredTodos: Todo[] = [];
  if (filter === "Tous") {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter((todo) => todo.priority === filter);
  }
  const UrgentCount = todos.filter(
    (todo) => todo.priority === "Urgente",
  ).length;
  const MediumCount = todos.filter(
    (todo) => todo.priority === "Moyenne",
  ).length;
  const LowCount = todos.filter((todo) => todo.priority === "Basse").length;
  const TotalCount = todos.length;

  function DeletedTodo(id: number) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }
  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());
  function ToggleTodo(id: number) {
    const selectodos = new Set(selectedTodos);
    if (selectodos.has(id)) {
      selectodos.delete(id);
    } else {
      selectodos.add(id);
    }
    setSelectedTodos(selectodos);
  }
  function finishedTodo() {
    const newfinished = todos.filter((todo) => {
      if (selectedTodos.has(todo.id)) {
        return false;
      } else {
        return true;
      }
    });
    setTodos(newfinished);
    setSelectedTodos(new Set());
  }
  useEffect(() => {
    // Au chargement, récupérer le thème choisi dans localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Attendre que le DOM soit chargé avant de manipuler le checkbox
    const timer = setTimeout(() => {
      const checkbox = document.querySelector(
        ".theme-controller",
      ) as HTMLInputElement | null;
      if (checkbox) {
        checkbox.checked = savedTheme === "dark";
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <div>
      <div>
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            className="theme-controller"
            value="synthwave"
            onChange={handleToggle}
          />

          {/* sun icon */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
      <div className="flex justify-center">
        <div className="w-[90%] flex flex-col p-5 my-15 rounded-xl bg-base-300 md:w-2/3">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Ajouter une Tâche..."
              className="input w-full "
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <select
              className="select w-full "
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value="Basse">Basse</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Urgente">Urgente</option>
            </select>
            <button
              className="btn btn-primary w-full md:w-auto"
              onClick={addTodo}
            >
              Ajouter
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-3 gap-3 flex-wrap">
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                className={`${filter === "Tous" ? "btn btn-primary" : "btn btn-soft"}`}
                onClick={() => setFilter("Tous")}
              >
                Tous ({TotalCount})
              </button>
              <button
                className={`${filter === "Basse" ? "btn btn-primary" : "btn btn-soft"}`}
                onClick={() => setFilter("Basse")}
              >
                Basse ({LowCount})
              </button>
              <button
                className={`${filter === "Moyenne" ? "btn btn-primary" : "btn btn-soft"}`}
                onClick={() => setFilter("Moyenne")}
              >
                Moyenne ({MediumCount})
              </button>
              <button
                className={`${filter === "Urgente" ? "btn btn-primary" : "btn btn-soft"}`}
                onClick={() => setFilter("Urgente")}
              >
                Urgente ({UrgentCount})
              </button>
            </div>
            <div className="w-full md:w-auto mb-3 ">
              <button
                className="btn btn-primary w-full md:w-auto"
                disabled={selectedTodos.size == 0}
                onClick={finishedTodo}
              >
                Finir la selection{" "}
                {selectedTodos.size > 0 ? `(${selectedTodos.size})` : ""}
              </button>
            </div>
          </div>
          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/20">
              {filteredTodos.map((todo) => (
                <li key={todo.id}>
                  <TodoItem
                    todo={todo}
                    onDelete={() => DeletedTodo(todo.id)}
                    isSelected={selectedTodos.has(todo.id)}
                    onToggle={() => ToggleTodo(todo.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center flex-col">
              <Construction
                className="w-30 h-30 text-primary"
                strokeWidth={1}
              />
              <p className="text-sm font-bold">Aucune tâche à afficher</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
