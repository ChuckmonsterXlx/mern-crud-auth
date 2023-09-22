import { ReactNode, createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks";
import ITask from "../contracts/ITask";
import ICreateTask from "../contracts/tasks/ICreateTask";
import IUpdateTask from "../contracts/tasks/IUpdateTask";

export interface TasksContextProps {
  tasks: ITask[];
  createTask: (task: ICreateTask) => Promise<void>;
  getTasks: () => void;
  getTask: (id: string) => Promise<ITask>;
  updateTask: (id: string, task: IUpdateTask) => Promise<void>;
  deleteTask: (id: string) => void;
}

interface TasksProviderProps {
  children: ReactNode;
}

const TasksContext = createContext<TasksContextProps | null>(null);

export const useTasks = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
};

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const createTask = async (task: ICreateTask) => {
    try {
      await createTaskRequest(task);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      throw new Error("Error setting tasks");
    }
  };

  const getTask = async (id: string) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      throw new Error("Error getting task");
    }
  };

  const updateTask = async (id: string, task: IUpdateTask) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await deleteTaskRequest(id);

      if (res.status === 204) {
        setTasks(tasks.filter((task: ITask) => task._id != id));
      }
    } catch (error) {
      throw new Error("Error deleting task");
    }
  };

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, getTasks, getTask, updateTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
