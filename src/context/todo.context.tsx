import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo, TodoData } from "../@types/todo.d";

const LOCAL_STORAGE_KEY = "tp_todos";

export type TodoContextProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: TodoData) => void;
  updateTodo: (
    id: string,
    payload: Pick<Todo, "name" | "notes" | "priority" | "assignedUserUUID">
  ) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  getCompletedTodos: Todo[];
  getIncompletedTodos: Todo[];
};

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  setTodos: () => null,
  addTodo: () => null,
  updateTodo: () => null,
  removeTodo: () => null,
  toggleTodo: () => null,
  getCompletedTodos: [],
  getIncompletedTodos: [],
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
  const updateTodo = (
    id: string,
    payload: Pick<Todo, "name" | "notes" | "priority" | "assignedUserUUID">
  ) => {
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

  const getCompletedTodos = useMemo<Todo[]>(
    () =>
      todos
        .filter((todo) => todo.completed)
        .sort((a, b) => b.priority - a.priority),
    [todos]
  );
  const getIncompletedTodos = useMemo<Todo[]>(
    () =>
      todos
        .filter((todo) => !todo.completed)
        .sort((a, b) => b.priority - a.priority),
    [todos]
  );

  const value = {
    todos,
    setTodos,
    addTodo,
    updateTodo,
    removeTodo,
    toggleTodo,
    getCompletedTodos,
    getIncompletedTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
