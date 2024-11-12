"use client";
import AddCardButton from "@/components/addButton";
import React, { useState, useEffect } from "react";
import { Card } from "@/types";
import { cn } from "@/lib/utils";
import { Reorder } from "framer-motion";

export default function Home() {
  const [cards, setCards] = useState<Card[] | null>(null);
  const [taskInputs, setTaskInputs] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (cards === null) {
      const savedCards = localStorage.getItem("cards");
      setCards(savedCards ? JSON.parse(savedCards) : []);
    }
  }, [cards]);

  useEffect(() => {
    if (cards !== null) {
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [cards]);

  const handleRemoveCard = (id: number) => {
    setCards((prevCards) => prevCards?.filter((card) => card.id !== id) || []);
  };

  const handleAddTask = (id: number) => {
    const newTask = taskInputs[id]?.trim();
    if (newTask) {
      setCards(
        (prevCards) =>
          prevCards?.map((card) =>
            card.id === id
              ? {
                  ...card,
                  tasks: [
                    ...card.tasks,
                    { id: Date.now(), title: newTask, isComplete: false },
                  ],
                }
              : card
          ) || []
      );
      setTaskInputs((prevInputs) => ({ ...prevInputs, [id]: "" }));
    } else {
      alert("Input should not be empty");
    }
  };

  const handleInputChange = (id: number, value: string) => {
    setTaskInputs((prevInputs) => ({ ...prevInputs, [id]: value }));
  };

  const handleTaskStatusChange = (taskid: number) => {
    setCards(
      (prevCards) =>
        prevCards?.map((card) => ({
          ...card,
          tasks: card.tasks.map((task) =>
            task.id === taskid
              ? { ...task, isComplete: !task.isComplete }
              : task
          ),
        })) || []
    );
  };

  const handleTaskRemove = (id: number) => {
    setCards(
      (prevCards) =>
        prevCards?.map((card) => ({
          ...card,
          tasks: card.tasks.filter((task) => task.id !== id),
        })) || []
    );
  };

  const handleDownloadTasks = (cardId: number) => {
    const card = cards?.find((c) => c.id === cardId);
    if (card) {
      const cardTasksText = card.tasks
        .map((task) => `- ${task.title}`)
        .join("\n");
      const blob = new Blob([`Card ${cardId}:\n${cardTasksText}`], {
        type: "text/plain",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${cardId}.txt`;
      link.click();
    }
  };

  if (cards === null) return <div>Loading...</div>;

  return (
    <div>
      <AddCardButton setCards={setCards} />
      <div className="flex flex-col items-center mx-auto my-5  w-full max-w-[320px]">
        {cards.length > 0 ? (
          <Reorder.Group values={cards} onReorder={setCards}>
            {cards.map((card) => (
              <Reorder.Item key={card.id} value={card} className="mb-5">
                <div
                  className={cn(
                    `w-full min-h-[200px] shadow rounded-lg p-5`,
                    card.bg === "yellow" && "bg-yellow-200",
                    card.bg === "green" && "bg-green-200",
                    card.bg === "blue" && "bg-blue-200",
                    card.bg === "pink" && "bg-pink-200"
                  )}
                >
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleRemoveCard(card.id)}
                      className="bg-white text-red-600 px-2 rounded-full"
                    >
                      X
                    </button>
                    <button
                      onClick={() => handleDownloadTasks(card.id)}
                      className="px-2 bg-blue-600 rounded-full"
                    >
                      SAVE
                    </button>
                  </div>
                  <div className="flex items-center mt-6">
                    <input
                      className="flex-1 bg-white rounded-md px-2 h-10 text-black"
                      placeholder="Type task"
                      type="text"
                      value={taskInputs[card.id] || ""}
                      onChange={(e) =>
                        handleInputChange(card.id, e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleAddTask(card.id)}
                      className="bg-green-700 ml-2 px-4 rounded-md h-10"
                    >
                      Add
                    </button>
                  </div>
                  <div className="my-5 flex flex-col gap-2">
                    {card.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start justify-between text-black"
                      >
                        <input
                          onChange={() => handleTaskStatusChange(task.id)}
                          type="checkbox"
                          checked={task.isComplete}
                        />
                        <span
                          className={cn(
                            `text-black`,
                            task.isComplete && "line-through"
                          )}
                        >
                          {task.title}
                        </span>
                        <button
                          onClick={() => handleTaskRemove(task.id)}
                          className="font-bold text-red-500 text-xl"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        ) : (
          <p className="text-black">No Cards</p>
        )}
      </div>
    </div>
  );
}
