import React from "react";

const TaskList = ({ tasks, methods }) => {
  const { setLocalStorageData, getLocalStorageData } = methods;
  const toggleCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setLocalStorageData(updatedTasks);
    getLocalStorageData();
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setLocalStorageData(updatedTasks);
    getLocalStorageData();
  };
  return (
    <div>
      <ul>
        {tasks
          ? tasks.map((task) => (
              <li key={task.id}>
                <div
                  className={`${
                    task.completed ? "bg-emerald-600" : "bg-blue-400"
                  } px-3 py-2 w-full mt-4 rounded`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4
                        className={`text-gray-700 font-semibold task-title ${
                          task.completed ? "line-through" : ""
                        }`}
                      >
                        {task.title}
                      </h4>
                    </div>
                    <div>
                      <h3 className="bg-yellow-100 px-2 py-0.5 rounded-md text-red-900 font-semibold">
                      {new Date(task.date).toISOString().split("T")[0].split("-").reverse().join("-")}
                      </h3>
                    </div>
                    <div id="completed" className="flex items-center">
                      <input
                        type="checkbox"
                        onClick={() => toggleCompleted(task.id)}
                        defaultChecked={task.completed}
                        className="me-1"
                      />
                      <h3 className={`text-black ${task.completed ? "" : ""}`}>
                        Completed
                      </h3>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="ms-3 px-2 py-1 rounded bg-red-700 hover:bg-red-600 transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default TaskList;
