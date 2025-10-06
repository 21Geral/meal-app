import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

export default function Cards({ endpoint = "random.php", count = 12 }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cacheKey = `cards-${endpoint}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      setMeals(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const fetchMeals = async () => {
      try {
        setLoading(true);

        // Si el endpoint es random.php, pedimos "count" veces
        if (endpoint === "random.php") {
          const requests = Array.from({ length: count }, () => axios.get(`${BASE_URL}${endpoint}`));
          const responses = await Promise.all(requests);
          const data = responses.map((res) => res.data?.meals?.[0]).filter(Boolean);
          setMeals(data);
          sessionStorage.setItem(cacheKey, JSON.stringify(data));
        } else {
          // Para otros endpoints, comportamiento normal
          const res = await axios.get(`${BASE_URL}${endpoint}`);
          const array = Object.values(res.data).find(Array.isArray) || [];
          setMeals(array);
          sessionStorage.setItem(cacheKey, JSON.stringify(array));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [endpoint, count]);

  if (loading) return <p className="text-center py-6 text-xl">Loading recipes...</p>;
  if (error) return <p className="text-center text-red-600 py-6">Error: {error}</p>;
  if (!meals.length) return <p className="text-center py-6">No recipes found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 lg:p-12">
      {meals.map((meal, index) => (
        <Link
          to={`/meal/${meal.idMeal}`}
          key={`${meal.idMeal}-${index}`} // 🔥 combinación id + índice = único siempre
          className="bg-white rounded shadow p-2 flex flex-col items-center w-full max-w-xs mx-auto hover:scale-105 transition-transform duration-200"
        >
          <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" className="w-full h-40 object-cover rounded" />
          <h3 className="mt-2 text-center font-semibold" style={{ color: "#a49267" }}>
            {meal.strMeal}
          </h3>
        </Link>
      ))}
    </div>
  );
}
