import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios.lib";

interface ITask {
  title: string;
  description: string;
  status: string;
  dueDate: Date;
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
    <div>
      {allTasks.map((task: ITask, index) => {
        return (
          <div key={index}>
            <h2>{task.title}</h2>
          </div>
        );
      })}
    </div>
  );
};
