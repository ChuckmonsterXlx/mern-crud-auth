import { ReactNode, createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
} from "../api/tasks";
import ITask from "../contracts/ITask";

export interface TasksContextProps {
  tasks: ITask[];
  createTask: (task: ITask) => void;
  getTasks: () => void;
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

  const createTask = async (task: ITask) => {
    const res = await createTaskRequest(task);
  };

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      throw new Error("Error setting tasks");
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
    <TasksContext.Provider value={{ tasks, createTask, getTasks, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};
