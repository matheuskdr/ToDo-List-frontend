"use client";

import { Page } from "@/template/Page";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [showResult, setShowResult] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = async () => {
    const res = await axios.post(
      `https://todo-list-backend-production-0ccd.up.railway.app/task/`,
      {
        name: inputValue,
      }
    );
    setInputValue("");

    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
    }, 3000);
  };

  return (
    <Page>
      <div className="flex flex-col gap-3">
        <h1 className="font-bold">Adicione uma Tarefa</h1>
        <p>Nome da tarefa?</p>
        <input
          className="p-2 border rounded mb-4"
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
        <button
          onClick={handleAddTask}
          className="border cursor-pointer rounded-md"
        >
          Salvar
        </button>
        {showResult && (
          <div className="mt-4 p-3 bg-green-500 text-white rounded-md">
            Tarefa Salva
          </div>
        )}
      </div>
    </Page>
  );
}
