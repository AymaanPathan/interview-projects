import dotenv from "dotenv";
dotenv.config();
import express, { type Request, type Response } from "express";
import { connectDb } from "./lib/db.lib.js";
import TaskRouter from "./routes/Task.route.js";

const app = express();

app.use(express.json());
connectDb();

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

app.use("/tasks", TaskRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    status: 200,
    message: "Your basic server is live!",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
