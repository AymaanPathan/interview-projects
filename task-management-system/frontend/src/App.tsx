import { useEffect, useState } from "react";
import { axiosInstance } from "./lib/axios.lib";

interface ITask {
  title: string;
  description: string;
  status: string;
  dueDate: Date;
}

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [dueDate, setDueDate] = useState("");

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/tasks/add", {
        title,
        description,
        status,
        dueDate,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleGetAllTask = async () => {
      try {
        const response = await axiosInstance.get("/tasks/getAll");
        console.log(response);
        setAllTasks(response.data.allTasks);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetAllTask();
  }, []);

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-10">
        <form
          onSubmit={handleAddTask}
          className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-6 shadow"
        >
          <h1 className="text-2xl font-bold">Add Task</h1>

          <input
            type="text"
            placeholder="Enter your task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded border p-2"
          />

          <textarea
            placeholder="Enter your description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded border p-2"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded border p-2"
          >
            <option value="pending">Pending</option>
            <option value="in-Progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="rounded border p-2"
          />

          <button type="submit" className="rounded bg-blue-500 p-2 text-white">
            Add Task
          </button>
        </form>
      </div>
      {allTasks.map((task: ITask, index) => {
        return (
          <div key={index}>
            <h2>{task.title}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default App;
