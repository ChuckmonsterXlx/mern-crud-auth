import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/task-card/TaskCard";

const TasksPage = () => {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) {
    return <h1>No tasks!</h1>;
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task: any) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
};

export default TasksPage;
