import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RelatedMeals({ category, currentMealId }) {
  const [relatedMeals, setRelatedMeals] = useState([]);

  useEffect(() => {
    if (category) {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then((res) => {
          // Filtramos la receta actual

          const filtered = res.data.meals.filter((m) => m.idMeal !== currentMealId);
          setRelatedMeals(filtered.slice(0, 5)); 

        })
        .catch((err) => console.error("Error cargando relacionadas:", err));
    }
  }, [category, currentMealId]);

  return (
    <div className="grid  gap-4 mt-4">
      {relatedMeals.map((meal) => (
        <Link
          key={meal.idMeal}
          to={`/meal/${meal.idMeal}`} // 👉 navega al detalle
          className="bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-200 block"
        >
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-48 object-cover"
          />
          <p className="p-2 text-sm font-semibold text-gray-700">
            {meal.strMeal}
          </p>
        </Link>
      ))}
    </div>
  );
}
