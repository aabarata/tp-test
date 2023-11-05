import { RouterProvider } from "react-router-dom";
import Router from "./routes";

function App() {
  return (
    <div className="bg-grey-bg min-h-screen">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
