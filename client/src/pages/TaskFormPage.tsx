import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";

const TaskFormPage = () => {
  const { register, handleSubmit } = useForm();
  const { createTask } = useTasks();

  const onSubmit = handleSubmit((data) => {
    createTask(data);
  });

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
