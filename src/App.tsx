import { useContext } from "react";
import { TodoContext } from "./context/todo.context";

function App() {
  const { todos } = useContext(TodoContext);
  return (
    <div className="App">
      App
      {todos.map((todo) => (
        <div>{todo.name}</div>
      ))}
    </div>
  );
}

export default App;
