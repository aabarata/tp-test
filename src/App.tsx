import { useContext, useState } from "react";
import { TodoContext } from "./context/todo.context";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import TodoAddUpdate from "./components/todo-add-update-modal/todo-add-update-modal.component";
import displayNotification, {
  NotificationType,
} from "./components/notification/notification.component";
import TodoList from "./components/todo-list/todo-list.component";

function App() {
  const { getCompletedTodos, getIncompletedTodos } = useContext(TodoContext);
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
    <div className="bg-grey-bg">
      <div className="container mx-auto min-h-screen pt-6">
        <div className="flex flex-row justify-between mb-2">
          <h1 className="text-xl font-bold">Trustpair TODO list</h1>
          <Button
            startIcon={<DeleteIcon />}
            sx={{ color: "white" }}
            variant="contained"
            onClick={onAddTodoHandler}
          >
            Add new todo
          </Button>
        </div>
        <div className="w-full flex flex-row gap-x-8 h-full">
          <div className="flex-1 h-full">
            <h3 className="text-lg font-semibold mb-2">Todo</h3>
            {getIncompletedTodos.length > 0 && (
              <TodoList todos={getIncompletedTodos} />
            )}
          </div>
          <div className="flex-1 h-full">
            <h3 className="text-lg font-semibold mb-2">Completed</h3>
            {getCompletedTodos.length > 0 && (
              <TodoList todos={getCompletedTodos} isCompletedList />
            )}
          </div>
        </div>
        <TodoAddUpdate
          isOpen={isAddTodoModalOpen}
          afterOnClose={() => setIsAddTodoModalOpen(false)}
          afterOnSubmit={onTodoModalSubmitHandler}
        />
      </div>
      <div id="notification-root"></div>
    </div>
  );
}

export default App;
