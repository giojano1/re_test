"use client";
import AddCardButton from "@/components/addButton";
import React, { useState, useEffect } from "react";
import { Card } from "@/types";
import { cn } from "@/lib/utils";

export default function Home() {
  const [cards, setCards] = useState<Card[]>(() => {
    const savedCards = localStorage.getItem("cards");
    return savedCards ? JSON.parse(savedCards) : [];
  });
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);
  return (
    <div>
      <AddCardButton setCards={setCards} cards={cards} />
      <div className="flex flex-col items-center mx-auto my-5 gap-5 w-[320px]">
        {cards.map((card) => (
          <div
            key={card.id}
            className={cn(
              `w-full min-h-[200px] shadow rounded-lg`,
              card.bg === "yellow" && "bg-yellow-200",
              card.bg === "green" && "bg-green-200",
              card.bg === "blue" && "bg-blue-200",
              card.bg === "pink" && "bg-pink-200"
            )}
          ></div>
        ))}
      </div>
    </div>
  );
}
