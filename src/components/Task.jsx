import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const today = new Date().toISOString().slice(0, 10);
  const [dateInput, setDateInput] = useState(today);

  const getLocalStorageData = () => {
    const storageData = JSON.parse(localStorage.getItem("tasks"));
    setTasks(storageData);
  };

  const setLocalStorageData = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    (async () => {
      getLocalStorageData();
    })();
  }, []);

  

  const submitHandler = (e) => {
    e.preventDefault();

    if (taskInput == "") {
      alert("Please add a new Task!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskInput,
      date:dateInput,
      completed: false,
    };

    if (!tasks) {
      const updatedTasks = [newTask];
      setLocalStorageData(updatedTasks);
      getLocalStorageData();
    } else {
      const updatedTasks = [newTask, ...tasks];
      setLocalStorageData(updatedTasks);
      getLocalStorageData();
    }
    setTaskInput("");
    setDateInput(today);
  };

  return (
    <div className="w-[75%] mt-5 h-auto p-10 flex flex-col justify-center items-center">
      <div className="bg-gray-200 py-6 px-10 w-full h-auto rounded">
        <h2 className="mb-3 text-gray-600 text-2xl font-bold">
          To-Do List Project📝
        </h2>
        <div>
          <form
            onSubmit={(e) => submitHandler(e)}
            className="flex justify-between w-full"
            action=""
          >
            <input
              className="text-[1rem] w-[60%] px-3 py-1 border-gray-400 focus:border-gray-500 border-[1px] outline-none text-black rounded"
              placeholder="Enter your task"
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <input
              className="text-[1rem] px-3 py-1 cursor-pointer border-gray-400 focus:border-gray-500 border-[1px] outline-none text-black rounded"
              type="date"
              value={dateInput}
              // defaultValue={Date}
              onChange={(e)=>setDateInput(e.target.value)}
            />
            <button className="text-[0.8rem] w-[20%] px-5 py-1 bg-emerald-800 rounded hover:bg-emerald-700 transition-all">
              ADD TASK
            </button>
          </form>
        </div>
        <TaskList tasks={tasks} methods={{getLocalStorageData, setLocalStorageData}}/>
      </div>
    </div>
  );
};

export default Task;
