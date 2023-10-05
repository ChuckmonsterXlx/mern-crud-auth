import { useTasks } from "../../context/TasksContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
dayjs.extend(utc);

const TaskCard = ({ task }: { task: any }) => {
  const { deleteTask } = useTasks();
  const [btnAreVisible, setBtnAreVisible] = useState(false);

  return (
    <div className="w-full p-10 rounded-md bg-zinc-800">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex items-center gap-2">
          <div
            onClick={() => setBtnAreVisible(!btnAreVisible)}
            className="px-3 py-1 border border-white rounded-md cursor-pointer"
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
          {btnAreVisible ? (
            <div className="absolute flex flex-col gap-2 mt-40">
              <Link
                className="px-3 py-2 text-center text-white bg-blue-500 rounded-md hover:bg-blue-600"
                to={`/tasks/${task._id}`}
              >
                Edit
              </Link>
              <button
                className="px-3 py-2 text-center text-white bg-red-500 rounded-md hover:bg-red-600"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </header>
      <p className="mt-5 text-slate-300">{task.description}</p>
      <p className="mt-10">{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  );
};

export default TaskCard;
