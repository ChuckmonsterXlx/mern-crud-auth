import axios from "./axios";

export const getTasksRequest = () => axios.get("/tasks");

export const getTaskRequest = (id: string) => axios.get(`/tasks/${id}`);

export const createTaskRequest = (task: any) => axios.post("/tasks", task);

export const updateTaskRequest = (task: any) =>
  axios.put(`/tasks/${task._id}`, task);

export const deleteTaskRequest = (id: string) => axios.delete(`/tasks/${id}`);
