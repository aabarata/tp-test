import { createBrowserRouter } from "react-router-dom";
import Home from "./home/home.component";
import Todo from "./todo/todo.component";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/todos",
    element: <Home />,
  },
  {
    path: "/todos/:id",
    element: <Todo />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

export default Router;
