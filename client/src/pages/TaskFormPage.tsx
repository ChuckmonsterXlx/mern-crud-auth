import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import ICreateTask from "../contracts/tasks/ICreateTask";
import { useEffect } from "react";
import ITask from "../contracts/ITask";
import IUpdateTask from "../contracts/tasks/IUpdateTask";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const TaskFormPage = () => {
  const { register, getValues, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task: ITask = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"));
      }
    }

    loadTask();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = getValues();

    try {
      if (params.id) {
        const formData: IUpdateTask = {
          title: values.title,
          description: values.description,
          date: values.date,
        };
        updateTask(params.id, {
          ...formData,
          date: formData.date
            ? dayjs.utc(formData.date).format()
            : dayjs.utc().format(),
        });
      } else {
        const formData: ICreateTask = {
          title: values.title,
          description: values.description,
          date: values.date,
        };
        await createTask({
          ...formData,
          date: formData.date
            ? dayjs.utc(formData.date).format()
            : dayjs.utc().format(),
        });
      }
      navigate("/tasks");
    } catch (error) {
      console.log("Error creating task");
      throw new Error("Error creating task");
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="w-full max-w-md p-10 rounded-md bg-zinc-800">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="w-full px-4 py-2 my-2 text-white rounded-md bg-zinc-700"
            autoFocus
          />

          <label htmlFor="description">Description</label>
          <textarea
            rows={3}
            placeholder="Description"
            {...register("description")}
            className="w-full px-4 py-2 my-2 text-white rounded-md bg-zinc-700"
          />

          <label htmlFor="date">Date</label>
          <input
            type="date"
            {...register("date")}
            className="w-full px-4 py-2 my-2 text-white rounded-md bg-zinc-700"
          />

          <button className="px-3 py-2 bg-indigo-500 rounded-md">Save</button>
        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;
