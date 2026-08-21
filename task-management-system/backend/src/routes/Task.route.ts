import { Router } from "express";
import { Request, Response } from "express";
import { TaskStatuses } from "../constant/task.constant.js";
import { Task } from "../models/Task.model.js";
const router = Router();

console.log("Task Router LOADED");

router.post("/add", async (req: Request, res: Response) => {
  try {
    const { title, description, status, dueDate } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!status) {
      return res.status(400).json({
        message: "Task Status is Required to Add Task",
      });
    }

    if (status && !TaskStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid Task Status",
      });
    }

    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({
        message: "No Due Date Provided or InValid",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
    });

    return res.status(200).json({
      message: "Task Created SuccessFullt",
      SavedTask: task,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to Create task",
      error: err,
    });
  }
});

export default router;
