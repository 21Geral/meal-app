import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

export default function Cards({ endpoint = "random.php", count = 10 }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      if (endpoint === "random.php") {
        const promises = Array.from({ length: count }, () =>
          axios.get(`${BASE_URL}${endpoint}`)
        );
        const results = await Promise.all(promises);
        setMeals(results.map((res) => res.data.meals[0]));
      } else {
        const { data } = await axios.get(`${BASE_URL}${endpoint}`);
        setMeals(data.meals || []);
      }
    };
    fetchMeals();
  }, [endpoint, count]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 lg:p-12">
      {meals.map((meal) => (
        <div
          key={meal.idMeal}
          className="bg-white rounded shadow p-2 flex flex-col items-center w-full max-w-xs mx-auto"
        >
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-40 object-cover rounded"
          />
          <h3
            className="mt-2 text-center font-semibold"
            style={{ color: "#a49267" }}
          >
            {meal.strMeal}
          </h3>
        </div>
      ))}
    </div>
  );
}
