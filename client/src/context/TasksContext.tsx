import { ReactNode, createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest } from "../api/tasks";

export interface TasksContextProps {
  tasks: [];
  createTask: (task: any) => void;
  getTasks: () => void;
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
  const [tasks, setTasks] = useState<[]>([]);

  const createTask = async (task: any) => {
    const res = await createTaskRequest(task);
    console.log("res", res);
  };

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      throw new Error("Error setting tasks");
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, createTask, getTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
