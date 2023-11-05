import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TodoContext } from "../../context/todo.context";
import { UserContext } from "../../context/user.context";
import { Todo } from "../../@types/todo.d";
import { User } from "../../@types/user.d";
import { getPriorityLabel } from "../../business/todo.helpers";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const TodoRoute = () => {
  const { id } = useParams();
  const { getTodoById } = useContext(TodoContext);
  const { getUserByUUID } = useContext(UserContext);
  const [todo, setTodo] = useState<Todo | undefined>(undefined);
  const [assignedUser, setAssignedUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const todoById = getTodoById(id);
      setTodo(todoById);
      if (
        todoById &&
        "assignedUserUUID" in todoById &&
        typeof todoById.assignedUserUUID === "string"
      ) {
        const user = getUserByUUID(todoById.assignedUserUUID);
        setAssignedUser(user);
      }
    }
  }, [id, getTodoById, getUserByUUID]);

  const getCreatedAtLabel = (createdAt: number) => {
    return new Date(createdAt).toLocaleDateString("en-US");
  };

  const getUserName = useMemo(() => {
    return assignedUser
      ? `${assignedUser.name.title} ${assignedUser.name.first} ${assignedUser.name.last}`
      : "Unassigned";
  }, [assignedUser]);

  return (
    <div className="container mx-auto pt-6">
      {!todo ? (
        <div>Sorry, was not possible to find the todo with the id {id}</div>
      ) : (
        <div className="w-2/4">
          <div>
            <h1 className="text-xl font-bold">{todo.name}</h1>
            <span className="text-xs text-gray-400 font-semibold">
              {todo.id}
            </span>
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold mb-2">Notes:</label>
            <p className="bg-gray-200 py-1 px-3 italic">{todo.notes}</p>
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold mb-2">Priority:</label>
            <p className="bg-gray-200 py-1 px-3 italic">
              {getPriorityLabel(todo.priority)}
            </p>
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold mb-2">Assigned to:</label>
            <div className="flex flex-row items-center bg-gray-200 py-1 px-3 italic">
              <img
                className="mr-2 rounded-full"
                alt="assigned user"
                width={50}
                height={50}
                src={assignedUser?.picture.thumbnail}
              />
              <p>{getUserName}</p>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold mb-2">Status:</label>
            <p className="bg-gray-200 py-1 px-3 italic">
              {todo.completed ? "Completed" : "Incomplete"}
            </p>
          </div>
          <div className="mt-4">
            <label className="text-lg font-semibold mb-2">Created at:</label>
            <p className="bg-gray-200 py-1 px-3 italic">
              {getCreatedAtLabel(todo.createdAt)}
            </p>
          </div>
          <Link to="/">
            <Button
              startIcon={<ArrowBackIcon />}
              sx={{ color: "white", marginTop: "24px" }}
              variant="contained"
            >
              Back
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TodoRoute;
