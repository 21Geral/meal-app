import React, { useEffect, useState } from "react";
import { getCategories } from "../api/mealdb";

const BUTTON_BG = "#d87801";
const BUTTON_TEXT = "#e8c7a3";

export default function FilterButtons() {
  const [categories, setCategories] = useState([]);
  const [startIdx, setStartIdx] = useState(0);

  // Breakpoints
  const smCount = 4;
  const mdCount = 6;
  const lgCount = 10;

  // Detect width
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  let visibleCount = lgCount;
  if (width < 640) visibleCount = smCount;
  else if (width < 768) visibleCount = mdCount;

  const showMore = () => {
    if (startIdx + visibleCount < categories.length) {
      setStartIdx(startIdx + visibleCount);
    }
  };
  const showLess = () => {
    if (startIdx - visibleCount >= 0) {
      setStartIdx(startIdx - visibleCount);
    }
  };

  const visibleCategories = categories.slice(startIdx, startIdx + visibleCount);

  return (
    <div className="flex items-center w-full overflow-x-auto gap-2 py-4 lg:justify-center">
      {width < 1024 && (
        <button onClick={showLess} disabled={startIdx === 0} className="p-2">
          <svg width="24" height="24" fill={BUTTON_BG}>
            <polygon points="16,4 8,12 16,20" />
          </svg>
        </button>
      )}
      {visibleCategories.map((cat) => (
        <button
          key={cat.idCategory}
          className="rounded px-4 py-2 font-semibold whitespace-nowrap"
          style={{ background: BUTTON_BG, color: "#a49267" }}
        >
          {cat.strCategory}
        </button>
      ))}
      {width < 1024 && (
        <button
          onClick={showMore}
          disabled={startIdx + visibleCount >= categories.length}
          className="p-2"
        >
          <svg width="24" height="24" fill={BUTTON_BG}>
            <polygon points="8,4 16,12 8,20" />
          </svg>
        </button>
      )}
      {width >= 1024 && categories.length > lgCount && (
        <button
          onClick={showMore}
          className="flex items-center gap-2 rounded px-4 py-2 font-semibold"
          style={{ background: BUTTON_BG, color: BUTTON_TEXT }}
        >
          <svg width="20" height="20" fill={BUTTON_TEXT}>
            <circle cx="10" cy="10" r="8" />
            <text
              x="10"
              y="14"
              textAnchor="middle"
              fontSize="10"
              fill={BUTTON_BG}
            >
              +
            </text>
          </svg>
          Mostrar más
        </button>
      )}
    </div>
  );
}
