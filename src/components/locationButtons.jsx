import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

export default function LocationButtons() {
  const [areas, setAreas] = useState([]);
  const [startIdx, setStartIdx] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setAreas(res.data.meals))
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let visibleCount = 5;
  if (windowWidth < 640) visibleCount = 3;
  else if (windowWidth < 1024) visibleCount = 5;

  const showPrev = () => setStartIdx(Math.max(0, startIdx - visibleCount));
  const showNext = () =>
    setStartIdx(Math.min(areas.length - visibleCount, startIdx + visibleCount));

  const visibleAreas = areas.slice(startIdx, startIdx + visibleCount);

  return (
    <div className="flex justify-center items-center gap-3 py-4 w-full">
      <button
        onClick={showPrev}
        disabled={startIdx === 0}
        className="rounded px-2 py-2 font-bold flex items-center"
        style={{ background: "#e8c7a3" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <polygon points="15,6 9,12 15,18" fill="#d87801" />
        </svg>
      </button>
      {visibleAreas.map((area, idx) => (
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
        disabled={startIdx + visibleCount >= areas.length}
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
