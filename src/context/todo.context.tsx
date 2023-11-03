import { ReactNode, createContext, useState } from "react";
import { Todo } from "../@types/todo.d";

export type TodoContextProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: number, payload: Partial<Todo>) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  setTodos: () => null,
  addTodo: () => null,
  updateTodo: () => null,
  removeTodo: () => null,
  toggleTodo: () => null,
});

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {};
  const updateTodo = (id: number, payload: Partial<Todo>) => {};
  const removeTodo = (id: number) => {};
  const toggleTodo = (id: number) => {};

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
