import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import ICreateTask from "../contracts/tasks/ICreateTask";
import { useEffect } from "react";
import ITask from "../contracts/ITask";
import IUpdateTask from "../contracts/tasks/IUpdateTask";

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
      }
    }

    loadTask();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evitar el envío automático del formulario
    const values = getValues();

    try {
      if (params.id) {
        const formData: IUpdateTask = {
          title: values.title,
          description: values.description,
        };
        updateTask(params.id, formData);
      } else {
        const formData: ICreateTask = {
          title: values.title,
          description: values.description,
        };
        await createTask(formData);
      }
      navigate("/tasks");
    } catch (error) {
      console.log("Error creating task");
      throw new Error("Error creating task");
    }
  };

  return (
    <div className="w-full max-w-md p-10 rounded-md bg-zinc-800">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="w-full px-4 py-2 my-2 text-white rounded-md bg-zinc-700"
          autoFocus
        />
        <textarea
          rows={3}
          placeholder="Description"
          {...register("description")}
          className="w-full px-4 py-2 my-2 text-white rounded-md bg-zinc-700"
        />
        <button>Save</button>
      </form>
    </div>
  );
};

export default TaskFormPage;
