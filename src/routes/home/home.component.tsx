import { useContext, useState } from "react";
import { TodoContext } from "../../context/todo.context";
import displayNotification, {
  NotificationType,
} from "../../components/notification/notification.component";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import TodoList from "../../components/todo-list/todo-list.component";
import TodoAddUpdate from "../../components/todo-add-update-modal/todo-add-update-modal.component";

const Home = () => {
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
    <div className="container mx-auto pt-6">
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
          <TodoList todos={getIncompletedTodos} />
        </div>
        <div className="flex-1 h-full">
          <h3 className="text-lg font-semibold mb-2">Completed</h3>
          <TodoList todos={getCompletedTodos} isCompletedList />
        </div>
      </div>
      <TodoAddUpdate
        isOpen={isAddTodoModalOpen}
        afterOnClose={() => setIsAddTodoModalOpen(false)}
        afterOnSubmit={onTodoModalSubmitHandler}
      />
    </div>
  );
};

export default Home;
