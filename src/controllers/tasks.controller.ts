import { Request, Response } from "express";
import Task from "../models/task.model";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const getTasks = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user");

    res.json(tasks);
    return;
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id).select("-__v").populate({
      path: "user",
      select: "-__v -password",
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    } else {
      res.json(task);
      return;
    }
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, date } = req.body;

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });

    const savedTask = await newTask.save();

    res.json(savedTask);
    return;
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    } else {
      res.json(task);
      return;
    }
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    } else {
      res.sendStatus(204);
      return;
    }
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};
