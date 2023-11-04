import { ReactNode, createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo, TodoData } from "../@types/todo.d";

const LOCAL_STORAGE_KEY = "tp_todos";

export type TodoContextProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: TodoData) => void;
  updateTodo: (id: string, payload: Partial<Todo>) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
};

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  setTodos: () => null,
  addTodo: () => null,
  updateTodo: () => null,
  removeTodo: () => null,
  toggleTodo: () => null,
});

function getInitialState(): Todo[] {
  const todos = localStorage.getItem(LOCAL_STORAGE_KEY);
  return todos ? JSON.parse(todos) : [];
}

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(getInitialState);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: TodoData) => {
    setTodos((prevTodos) => [...prevTodos, { ...todo, id: uuidv4() }]);
  };
  const updateTodo = (id: string, payload: Partial<Todo>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...payload } : todo))
    );
  };
  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const value = {
    todos,
    setTodos,
    addTodo,
    updateTodo,
    removeTodo,
    toggleTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
