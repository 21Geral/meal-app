import React from "react";
import { Link } from "react-router-dom";
import useMealDbCarousel from "../hooks/useMealDbCarousel";

const url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
const visibleCountConfig = {
  default: 5,
  lg: 5,
  sm: 3,
};

export default function LocationButtons() {
  const { visibleData, showPrev, showNext, isPrevDisabled, isNextDisabled } =
    useMealDbCarousel(url, visibleCountConfig);

  return (
    <div className="flex justify-center items-center gap-3 py-4 w-full">
      <button
        onClick={showPrev}
        disabled={isPrevDisabled}
        className="rounded px-2 py-2 font-bold flex items-center"
        style={{ background: "#e8c7a3" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <polygon points="15,6 9,12 15,18" fill="#d87801" />
        </svg>
      </button>
      {visibleData.map((area, idx) => (
        <Link key={idx} to={`/location/${area.strArea}`}>
          <button
            value={area.strArea}
            className="rounded px-4 py-2 font-semibold whitespace-nowrap"
            style={{ background: "#e8c7a3", color: "#d87801" }}
          >
            {area.strArea}
          </button>
        </Link>
      ))}
      <button
        onClick={showNext}
        disabled={isNextDisabled}
        className="rounded px-2 py-2 font-bold flex items-center"
        style={{ background: "#e8c7a3" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <polygon points="9,6 15,12 9,18" fill="#d87801" />
        </svg>
      </button>
    </div>
  );
}
