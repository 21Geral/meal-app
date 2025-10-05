import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Search() {
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

            const startsWith = meals.filter((meal) =>
              meal.strMeal.toLowerCase().startsWith(qLower)
            );

            const contains = meals.filter(
              (meal) =>
                !meal.strMeal.toLowerCase().startsWith(qLower) &&
                meal.strMeal.toLowerCase().includes(qLower)
            );

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

  useEffect(() => {
    if (selectedIndex < 0) return;
    const list = resultsRef.current;
    if (!list) return;
    const item = list.children[selectedIndex];
    if (item) {
      item.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

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
    <div className="relative hidden md:flex justify-center w-full mb-6 py-5">
      {/* Contenedor relativo para el input y la lupa */}
      <div className="relative w-full max-w-md">
        {/* Lupa */}
        <button
          type="submit"
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 pointer-events-none"
          aria-label="Search icon"
          tabIndex={-1}
        >
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
            className="w-5 h-5 text-gray-600"
          >
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
          className="input rounded-full px-10 py-3 border border-gray-300 bg-gray-100
                     focus:outline-none focus:border-[#d87801] placeholder-gray-500
                     transition-all duration-300 shadow-md w-full"
          placeholder="Search recipes..."
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-activedescendant={
            selectedIndex >= 0 ? `result-item-${selectedIndex}` : undefined
          }
        />
      </div>

      {results.length > 0 && (
        <ul
          id="search-results"
          ref={resultsRef}
          className="absolute top-full mt-1 max-w-md bg-white rounded shadow-lg w-full max-h-64 overflow-y-auto z-50"
          role="listbox"
        >
          {results.map((meal, index) => (
            <li
              key={meal.idMeal}
              id={`result-item-${index}`}
              role="option"
              aria-selected={selectedIndex === index}
              onClick={() => goToMeal(meal.idMeal)}
              className={`cursor-pointer px-4 py-2 hover:bg-[#d87801] hover:text-white ${
                selectedIndex === index ? "bg-[#d87801] text-white" : ""
              }`}
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
