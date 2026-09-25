"use client";
import { useState } from "react";
import { arrangements } from "@/config/catalog";
import { FlowerCard } from "./FlowerCard";
export function Catalog() {
  const [category, setCategory] = useState("All flowers");
  const items = arrangements.filter(
    (a) => category === "All flowers" || a.category === category,
  );
  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filter by occasion">
        {["All flowers", "Everyday", "Romance", "Celebrations"].map((c) => (
          <button
            key={c}
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
        <span aria-live="polite">{items.length} arrangements</span>
      </div>
      <div className="product-grid">
        {items.map((a) => (
          <FlowerCard item={a} key={a.slug} />
        ))}
      </div>
      {!items.length && (
        <p>No arrangements here yet. Ask us about a custom design.</p>
      )}
    </>
  );
}
