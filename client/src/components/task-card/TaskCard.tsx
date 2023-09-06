import { useTasks } from "../../context/TasksContext";
import { Link } from "react-router-dom";

const TaskCard = ({ task }: { task: any }) => {
  const { deleteTask } = useTasks();

  return (
    <div className="w-full max-w-md p-10 rounded-md bg-zinc-800">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => deleteTask(task._id)}>Delete</button>
          <Link to={`/tasks/${task._id}`}>Edit</Link>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>{new Date(task.date).toLocaleDateString()}</p>
    </div>
  );
};

export default TaskCard;
