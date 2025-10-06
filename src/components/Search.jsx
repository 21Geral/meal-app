import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Search({ mobile = false }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const resultsRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    const delayDebounce = setTimeout(() => {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then((res) => {
          if (res.data.meals) {
            const meals = res.data.meals;
            const qLower = query.toLowerCase();
            const startsWith = meals.filter((m) => m.strMeal.toLowerCase().startsWith(qLower));
            const contains = meals.filter((m) => !m.strMeal.toLowerCase().startsWith(qLower) && m.strMeal.toLowerCase().includes(qLower));
            setResults([...startsWith, ...contains]);
          } else {
            setResults([]);
          }
          setSelectedIndex(-1);
        })
        .catch(() => {
          setResults([]);
          setSelectedIndex(-1);
        });
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const goToMeal = (idMeal) => {
    navigate(`/meal/${idMeal}`);
    setResults([]);
    setQuery("");
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        goToMeal(results[selectedIndex].idMeal);
      }
    }
  };

  return (
    <div className={`relative w-full ${mobile ? "block md:hidden px-4 mb-3" : "hidden md:flex justify-center mb-6 py-5"}`}>
      <div className="relative w-full max-w-md mx-auto">
        <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 p-1 pointer-events-none" aria-label="Search icon" tabIndex={-1}>
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search" className="w-5 h-5 text-gray-600">
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>

        <input
          className="rounded-full px-10 py-2 md:py-3 border border-gray-300 bg-gray-100
                     focus:outline-none focus:border-[#d87801] placeholder-gray-500
                     transition-all duration-300 shadow-md w-full text-xs md:text-base"
          placeholder="Search recipes..."
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
      </div>

      {results.length > 0 && (
        <ul ref={resultsRef} className="absolute top-full mt-1 max-w-md bg-white rounded shadow-lg w-full max-h-64 overflow-y-auto z-50">
          {results.map((meal, index) => (
            <li
              key={meal.idMeal}
              onClick={() => goToMeal(meal.idMeal)}
              className={`cursor-pointer px-4 py-2 hover:bg-[#d87801] hover:text-white ${selectedIndex === index ? "bg-[#d87801] text-white" : ""}`}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {meal.strMeal}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
