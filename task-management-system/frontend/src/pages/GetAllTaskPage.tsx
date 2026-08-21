import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios.lib";

interface ITask {
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export const GetAllTaskPage = () => {
  const [allTasks, setAllTasks] = useState([]);

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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-10">
      <div
        className="flex w-full max-w-lg  flex-col gap-4 rounded-lg bg-white p-6
      shadow"
      >
        <h1>ALL Tasks</h1>
        {allTasks.map((task: ITask) => {
          return (
            <div className="items-center border p-4 ">
              <h1>{task.title}</h1>
              <p>{task.description}</p>
              <p>{task.dueDate}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
