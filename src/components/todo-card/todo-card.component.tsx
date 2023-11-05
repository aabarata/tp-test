import { useContext, useState } from "react";
import { Todo } from "../../@types/todo.d";
import { TodoContext } from "../../context/todo.context";
import { UserContext } from "../../context/user.context";
import {
  getPriorityColor,
  getPriorityLabel,
} from "../../business/todo.helpers";
import styles from "./todo-card.module.scss";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import displayNotification, {
  NotificationType,
} from "../notification/notification.component";
import TodoAddUpdate from "../todo-add-update-modal/todo-add-update-modal.component";

type TodoCardProps = {
  className?: string;
  todo: Todo;
};

const TodoCard = ({ className, todo }: TodoCardProps) => {
  const [isUpdateTodoModalOpen, setIsUpdateTodoModalOpen] =
    useState<boolean>(false);
  const { toggleTodo, removeTodo } = useContext(TodoContext);
  const { getUserByUUID } = useContext(UserContext);
  const user = getUserByUUID(todo.assignedUserUUID as string);

  const getCreatedAtLabel = () => {
    return new Date(todo.createdAt).toLocaleDateString("en-US");
  };

  const onCompletedChangeHandle = () => {
    toggleTodo(todo.id);
    displayNotification({
      type: NotificationType.SUCCESS,
      message: "The todo was updated sucessfully!",
      duration: 3000,
    });
  };

  const onRemoveClickHandle = () => {
    removeTodo(todo.id);
    displayNotification({
      type: NotificationType.SUCCESS,
      message: "The todo was removed sucessfully!",
      duration: 3000,
    });
  };

  const onTodoModalSubmitHandler = () => {
    displayNotification({
      type: NotificationType.SUCCESS,
      message: "The todo was successfully updated!",
      duration: 3000,
    });
    setIsUpdateTodoModalOpen(false);
  };

  return (
    <div
      className={`flex flex-row bg-white px-1.5 py-2 rounded ${
        className ?? ""
      }`}
    >
      <div className="flex flex-row items-center justify-center mr-2">
        <Checkbox checked={todo.completed} onChange={onCompletedChangeHandle} />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex flex-row items-center justify-between mb-1">
          <span
            className={`flex flex-row items-center font-bold ${
              !todo.completed || "line-through"
            }`}
          >
            {todo.name}
            <IconButton
              size="small"
              aria-label="edit todo"
              sx={{ marginLeft: "8px", color: "inherit" }}
              disabled={todo.completed}
              onClick={() => setIsUpdateTodoModalOpen(true)}
            >
              <EditIcon fontSize="small" />
            </IconButton>{" "}
            <IconButton
              size="small"
              aria-label="edit todo"
              sx={{ color: "inherit" }}
              onClick={onRemoveClickHandle}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>{" "}
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: getPriorityColor(todo.priority) }}
          >
            {getPriorityLabel(todo.priority)}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="text-sm text-gray-400">
            Created at: {getCreatedAtLabel()}
          </span>
          <div
            className={styles.assigned}
            style={{ backgroundImage: `url(${user?.picture.thumbnail})` }}
          />
        </div>
      </div>
      <TodoAddUpdate
        isOpen={isUpdateTodoModalOpen}
        todo={todo}
        afterOnClose={() => setIsUpdateTodoModalOpen(false)}
        afterOnSubmit={onTodoModalSubmitHandler}
      />
    </div>
  );
};

export default TodoCard;
