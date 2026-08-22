import { Router } from "express";
import { Request, Response } from "express";
import { TaskStatuses } from "../constant/task.constant.js";
import { Task } from "../models/Task.model.js";
const router = Router();

console.log("Task Router LOADED");

// Adding Task Route
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

// Get All Task Route

// add search
router.get("/getAll", async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let allTasks;

    if (typeof search === "string" && search.trim() !== "") {
      allTasks = await Task.find({
        $or: [
          {
            title: {
              $regex: search,
              $options: "i",
            },
          },
          {
            description: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      });
    } else {
      allTasks = await Task.find();
    }
    if (allTasks.length === 0) {
      return res.status(200).json({
        message: "No Tasks Found",
        allTasks: [],
      });
    }
    return res.status(200).json({
      message: "Task Fetched SuccessFully",
      allTasks,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed To Fetch Tasks",
      error: err,
    });
  }
});

// Edit Task Title or Description or status
router.patch("/edit/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }
    res.status(200).json({
      message: "Task Updated Successfully",
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Edit Task",
      error,
    });
  }
});

// Get Single
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const singleTask = await Task.findById(id);
    if (!singleTask) {
      return res.status(400).json({
        message: "Task Not Found",
      });
    }
    return res.status(200).json({
      message: "Task Got",
      singleTask,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to Load Tasks",
      error: err,
    });
  }
});

export default router;
