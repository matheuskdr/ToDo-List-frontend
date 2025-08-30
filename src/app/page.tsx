"use client";

import { Page } from "@/template/Page";
import { useEffect, useState } from "react";
import { Task } from "./types/Task";
import axios from "axios";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://todo-list-backend-production-0ccd.up.railway.app/task")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handlerSetDoneTask = async (task: Task) => {
    const res = await axios.put(
      `https://todo-list-backend-production-0ccd.up.railway.app/task/${task._id}`,
      {
        done: !task.done,
      }
    );
    const updatedTask = res.data;
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );

    console.log(res, task);
  };

  const handlerDeleteTask = async (task: Task) => {
    const res = await axios.delete(
      `https://todo-list-backend-production-0ccd.up.railway.app/task/${task._id}`
    );

    const updatedTask = res.data;
    setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    console.log(res.data);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleUpdateTask = async (task: Task) => {
    const res = await axios.put(
      `https://todo-list-backend-production-0ccd.up.railway.app/task/${task._id}`,
      {
        name: inputValue,
      }
    );
    const updatedTask = res.data;
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );

    setEditModal(false);
    console.log(res, task);
  };

  return (
    <Page>
      <div className="flex items-start gap-6">
        <div className="flex flex-col gap-3">
          {tasks.map((item) => (
            <div
              onClick={() => handlerSetDoneTask(item)}
              key={item._id}
              className={`flex justify-between gap-5 w-2xs py-4 px-5 border cursor-pointer rounded-full ${
                item.done ? "border-green-500" : "border-white"
              }`}
            >
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setEditTask(item);
                  setEditModal(true);
                }}
              >
                <EditIcon />
              </span>
              {item.name}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handlerDeleteTask(item);
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </span>
            </div>
          ))}
        </div>
        {editModal && (
          <div className="flex flex-col">
            <h1 className="font-bold">Edite o nome da Tarefa</h1>
            <p>Nome Antigo: {editTask?.name}</p>
            <input
              className="p-2 border rounded mb-4"
              type="text"
              value={inputValue}
              onChange={handleChange}
            />
            <button
              onClick={() => {
                if (editTask) handleUpdateTask(editTask);
              }}
              className="border cursor-pointer rounded-md"
            >
              Salvar
            </button>
          </div>
        )}
      </div>
    </Page>
  );
}
