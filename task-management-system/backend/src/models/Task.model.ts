import mongoose, { Schema, type Document } from "mongoose";
import { TaskStatuses } from "../constant/task.constant.js";

interface ITask extends Document {
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  completedAt?: Date;
  dueDate?: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: TaskStatuses,
    },
    completedAt: {
      type: Date,
      required: false,
    },
    dueDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Task = mongoose.model<ITask>("Task", taskSchema);
