import { Todo } from "../../@types/todo";
import styles from "./todo-list.module.scss";
import TodoCard from "../todo-card/todo-card.component";

type TodoListProps = {
  todos: Todo[];
  isCompletedList?: boolean;
};

const TodoList = ({ todos, isCompletedList = false }: TodoListProps) => {
  return (
    <div
      className={`rounded-lg p-3 overflow-y-auto ${styles.list} ${
        isCompletedList ? "bg-green-col" : "bg-blue-col"
      }`}
    >
      {todos.map((todo, index) => (
        <TodoCard
          className={index < todos.length - 1 ? "mb-2" : ""}
          key={todo.id}
          todo={todo}
        />
      ))}
    </div>
  );
};

export default TodoList;
