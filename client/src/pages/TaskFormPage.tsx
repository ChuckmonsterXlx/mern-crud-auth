import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate } from "react-router-dom";
import ICreateTask from "../contracts/tasks/ICreateTask";

const TaskFormPage = () => {
  const { register, getValues } = useForm();
  const { createTask } = useTasks();
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evitar el envío automático del formulario
    const values = getValues();
    const formData: ICreateTask = {
      title: values.title,
      description: values.description,
    };

    try {
      await createTask(formData);
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
