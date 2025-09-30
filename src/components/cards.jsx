import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Cards() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const promises = Array.from({ length: 10 }, () =>
        axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
      );
      const results = await Promise.all(promises);
      setMeals(results.map((res) => res.data.meals[0]));
    };
    fetchMeals();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
      {meals.map((meal) => (
        <div
          key={meal.idMeal}
          className="bg-white rounded shadow p-2 flex flex-col items-center"
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
