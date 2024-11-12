"use client";
import AddCardButton from "@/components/addButton";
import React, { useState, useEffect } from "react";
import { Card } from "@/types";
import Cards from "@/components/cards";
export default function Home() {
  const [cards, setCards] = useState<Card[]>(() => {
    if (typeof window != "undefined") {
      const savedCards = localStorage.getItem("cards");
      return savedCards ? JSON.parse(savedCards) : [];
    }
  });
  // save cards to local storage
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  return (
    <div>
      <AddCardButton setCards={setCards} />
      <Cards cards={cards} setCards={setCards} />
    </div>
  );
}
