"use client";
import { useState } from "react";

const GENRES = ["Games", "Chatting", "Music", "IRL", "Creative", "Other"] as const;
type Genre = (typeof GENRES)[number];

export default function GenreFilter({ onFilterChange }: { onFilterChange: (genre: Genre | "All") => void }) {
  const [active, setActive] = useState<Genre | "All">("All");
  const handleClick = (genre: Genre | "All") => { setActive(genre); onFilterChange(genre); };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button onClick={() => handleClick("All")} className={`text-sm px-3 py-1 rounded ${active === "All" ? "bg-accent text-white" : "bg-[#242428] text-zinc-300 border border-zinc-700"}`}>All</button>
      {GENRES.map((genre) => (
        <button key={genre} onClick={() => handleClick(genre)} className={`text-sm px-3 py-1 rounded ${active === genre ? "bg-accent text-white" : "bg-[#242428] text-zinc-300 border border-zinc-700"}`}>{genre}</button>
      ))}
    </div>
  );
}