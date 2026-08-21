import mongoose, { Schema, type Document } from "mongoose";

interface ITask extends Document {
  title: String;
  description: String;
  status: "pending" | "in-progress" | "completed";
  completedAt?: Date;
  dueDate?: Date;
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    required: true,
  },
  completedAt: {
    type: Date,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
});

export const Task = mongoose.model<ITask>("Task", taskSchema);
