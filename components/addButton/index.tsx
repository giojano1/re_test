"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/types";
type btnProps = {
  setCards: (cards: (prevCards: Card[]) => Card[]) => void;
  cards: Card[];
};

const AddCardButton = ({ setCards, cards }: btnProps) => {
  const buttonOptions = ["yellow", "green", "blue", "pink"];
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleAddCards = (option: string) => {
    const newCard = {
      id: Date.now(),
      bg: option,
      tasks: [],
    };
    setCards((prevcards) => [...prevcards, newCard]);
    setShowOptions(false);
  };
  return (
    <div className="fixed bottom-4 right-4">
      {showOptions && (
        <div className="flex flex-col gap-2">
          {buttonOptions.map((btn) => (
            <button
              key={btn}
              onClick={() => handleAddCards(btn)}
              className={cn(
                `w-14 h-14 rounded-full bg-black `,
                btn === "yellow" && "bg-yellow-200",
                btn === "green" && "bg-green-200",
                btn === "blue" && "bg-blue-200",
                btn === "pink" && "bg-pink-200"
              )}
            ></button>
          ))}
        </div>
      )}
      <button
        onClick={() => setShowOptions((prev) => !prev)}
        className="bg-blue-950 w-14 h-14 rounded-full text-3xl  mt-2"
      >
        +
      </button>
    </div>
  );
};

export default AddCardButton;
