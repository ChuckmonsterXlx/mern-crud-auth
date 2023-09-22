import IUpdateTask from "../contracts/tasks/IUpdateTask";
import axios from "./axios";

export const getTasksRequest = () => axios.get("/tasks");

export const getTaskRequest = (id: string) => axios.get(`/tasks/${id}`);

export const createTaskRequest = (task: any) => axios.post("/tasks", task);

export const updateTaskRequest = (id: string, task: IUpdateTask) =>
  axios.put(`/tasks/${id}`, task);

export const deleteTaskRequest = (id: string) => axios.delete(`/tasks/${id}`);
