import { AddTaskPage } from "./pages/AddTaskPage";
import { GetAllTaskPage } from "./pages/GetAllTaskPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 border-b p-4">
        <Link to="/">All Tasks</Link>

        <Link to="/add-task">Add Task</Link>
      </nav>
      <Routes>
        <Route path="/add-task" element={<AddTaskPage />} />
        <Route path="/" element={<GetAllTaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
