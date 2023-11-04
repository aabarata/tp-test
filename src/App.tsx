import { useContext, useState } from "react";
import { TodoContext } from "./context/todo.context";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddUpdateTodo from "./components/add-update-todo-modal/add-update-todo-modal.component";
import displayNotification, {
  NotificationType,
} from "./components/notification/notification.component";

function App() {
  const { todos } = useContext(TodoContext);
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState<boolean>(false);

  const onAddTodoHandler = () => {
    setIsAddTodoModalOpen(true);
  };

  const onTodoModalSubmitHandler = () => {
    displayNotification({
      type: NotificationType.SUCCESS,
      message: "The todo was successfully added!",
      duration: 3000,
    });
    setIsAddTodoModalOpen(false);
  };

  return (
    <div className="container mx-auto min-h-screen pt-6">
      <div className="flex flex-row justify-between">
        <span>TODO list</span>
        <Button
          startIcon={<DeleteIcon />}
          sx={{ color: "white" }}
          variant="contained"
          onClick={onAddTodoHandler}
        >
          Add new todo
        </Button>
      </div>
      <div className="w-full flex flex-row gap-x-8">
        <div className="flex-1">
          {todos.map((todo) => (
            <div key={todo.id}>{todo.name}</div>
          ))}
        </div>
        <div className="flex-1">Done</div>
      </div>
      <AddUpdateTodo
        isOpen={isAddTodoModalOpen}
        afterOnClose={() => setIsAddTodoModalOpen(false)}
        afterOnSubmit={onTodoModalSubmitHandler}
      ></AddUpdateTodo>
      <div id="notification-root"></div>
    </div>
  );
}

export default App;
