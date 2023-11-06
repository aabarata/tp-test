import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Todo } from "../../@types/todo.d";
import { TodoContext } from "../../context/todo.context";
import { UserContext } from "../../context/user.context";
import {
  getPriorityColor,
  getPriorityLabel,
} from "../../business/todo.helpers";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
      className={`flex flex-row bg-white px-1.5 py-2 rounded shadow-md ${
        className ?? ""
      }`}
    >
      <div className="flex flex-row items-center justify-center mr-2">
        <Checkbox
          data-testid="card-action-status"
          checked={todo.completed}
          onChange={onCompletedChangeHandle}
        />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex flex-row items-center justify-between mb-1">
          <span
            className={`flex flex-row items-center font-bold ${
              !todo.completed || "line-through"
            }`}
          >
            <span className="mr-2" data-testid="card-name">
              {todo.name}
            </span>
            <Link to={`/todos/${todo.id}`}>
              <IconButton
                data-testid="card-action-details"
                size="small"
                aria-label="open todo"
                sx={{ color: "inherit" }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Link>
            <IconButton
              data-testid="card-action-update"
              size="small"
              aria-label="edit todo"
              disabled={todo.completed}
              sx={{ color: "inherit" }}
              onClick={() => setIsUpdateTodoModalOpen(true)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              data-testid="card-action-remove"
              size="small"
              aria-label="delete todo"
              sx={{ color: "inherit" }}
              onClick={onRemoveClickHandle}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </span>
          <span
            data-testid="card-priority"
            className="text-xs font-semibold"
            style={{ color: getPriorityColor(todo.priority) }}
          >
            {getPriorityLabel(todo.priority)}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between">
          <span className="text-sm text-gray-400" data-testid="card-created-at">
            Created at: {getCreatedAtLabel()}
          </span>
          <img
            data-testid="card-assigned-photo"
            className="rounded-full"
            alt="assigned user"
            width={20}
            height={20}
            src={user?.picture.thumbnail}
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
