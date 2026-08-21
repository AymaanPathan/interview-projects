/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios.lib";

interface ITask {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export const GetAllTaskPage = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [search, setSearch] = useState("");

  const handleGetAllTask = async () => {
    try {
      const response = await axiosInstance.get("/tasks/getAll", {
        params: {
          search,
        },
      });

      setAllTasks(response.data.allTasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllTask();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-10">
      <div
        className="flex w-full max-w-lg  flex-col gap-4 rounded-lg bg-white p-6
      shadow"
      >
        <div className="flex items-center gap-7">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border"
            type="text"
            placeholder="Search By name"
          />
          <button
            onClick={handleGetAllTask}
            className="p-2 text-white bg-red-600 active:scale-95"
          >
            Search
          </button>
        </div>
        {allTasks.map((task: ITask) => {
          return (
            <div key={task._id} className="items-center border p-4 ">
              <h1 className="m-2">Title: {task.title}</h1>
              <p className="m-2">description: {task.description}</p>
              <p className="m-2">
                Duedate: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
