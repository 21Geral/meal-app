import { Link } from "react-router-dom";
import useMealDbCarousel from "../hooks/useMealDbCarousel";

export default function RelatedMeals({ category, currentMealId }) {
  const { visibleData, loading, error } = useMealDbCarousel(category ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}` : null, {
    default: 5,
    sm: 3,
    lg: 4,
  });

  const filtered = (visibleData || []).filter((meal) => meal.idMeal !== currentMealId);
  const relatedMeals = filtered.slice(0, 5);
  if (!category) return null;

  if (loading) {
    return <p className="text-center text-sm text-gray-500 py-4">Loading related recipes...</p>;
  }

  if (error) {
    return <p className="text-center text-sm text-red-500 py-4">{error}</p>;
  }

  if (relatedMeals.length === 0) {
    return <p className="text-center text-sm text-gray-500 py-4">No related recipes were found.</p>;
  }

  return (
    <div className="grid gap-10 mt-4 px-4 lg:px-2">
      {relatedMeals.map((meal) => (
        <Link
          key={meal.idMeal}
          to={`/meal/${meal.idMeal}`}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-200 block"
        >
          <img src={meal.strMealThumb} loading="lazy" alt={meal.strMeal} className="w-full h-48 object-cover" />
          <p className="p-2 text-sm font-semibold text-gray-700">{meal.strMeal}</p>
        </Link>
      ))}
    </div>
  );
}
