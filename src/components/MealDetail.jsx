import { useParams } from "react-router-dom";
import RelatedMeals from "./RelatedMeals.jsx";
import useMealDbCarousel from "../hooks/useMealDbCarousel"; // ajusta la ruta
import React from "react";

export default function MealDetail() {
  const { idMeal } = useParams();

  // Usamos el hook para cargar los detalles de la comida por ID
  const { visibleData, loading, error } = useMealDbCarousel(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`, {
    default: 1,
    sm: 1,
    lg: 1,
  });

  const meal = visibleData[0]; // porque lookup.php siempre devuelve un array con 1 elemento

  if (loading) return <p className="text-center text-2xl py-10">Loading details...</p>;
  if (error) return <p className="text-center text-red-500 text-2xl py-10">{error}</p>;
  if (!meal) return <p className="text-center text-2xl py-10">Meal not found</p>;

  // --- Ingredientes ---
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim() !== "") {
      ingredients.push(`${measure} ${ing}`);
    }
  }

  const youtubeUrl = meal.strYoutube?.replace("watch?v=", "embed/");

  return (
    <main className="max-w-[2000px] mx-auto px-12 md:px-32 py-4 xl:px-52">
      {/* Banner */}
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <img src={meal.strMealThumb} loading="lazy" alt={meal.strMeal} className="w-full h-52 md:h-80 lg:h-[550px] object-cover object-center" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <h1 className="text-white text-3xl lg:text-5xl font-bold text-center px-4">{meal.strMeal}</h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        {/* Ingredientes e instrucciones */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6 order-1 lg:order-1">
          <h3 className="px-4 py-2 text-[#d87801] font-semibold text-3xl">Ingredients</h3>
          <ul className="list-disc px-12 text-2xl marker:text-[#d87801]">
            {ingredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>

          <h3 className="px-4 py-2 text-[#d87801] font-semibold mt-6 text-3xl">Directions</h3>
          <p className="text-2xl px-6">{meal.strInstructions}</p>
        </div>

        {/* Aside */}
        <aside className="bg-[#F2ECE1] rounded-xl shadow-md p-6 text-2xl order-3 lg:order-2 lg:row-span-2">
          <h2 className="font-bold text-gray-800 my-6">Information</h2>
          <p>
            <span className="font-semibold">Category:</span> <span className="text-[#a49267] font-semibold">{meal.strCategory}</span>
          </p>
          <p>
            <span className="font-semibold">Country:</span> <span className="text-[#65921c] font-semibold">{meal.strArea}</span>
          </p>
          {meal.strTags && (
            <p>
              <span className="font-semibold">Tags:</span>{" "}
              <span className="text-[#65921c] font-semibold">
                {meal.strTags
                  .split(",")
                  .map((tag) => tag.trim())
                  .join(", ")}
              </span>
            </p>
          )}

          <h2 className="font-bold text-gray-800 my-6">Related Recipes</h2>
          <RelatedMeals category={meal.strCategory} currentMealId={meal.idMeal} />
        </aside>

        {/* Video */}
        <div className="order-2 lg:order-3 lg:col-span-3">
          <h2 className="text-3xl text-[#d87801] font-bold mb-2">Watch How to Make It</h2>
          <div className="relative w-full h-64 sm:h-[450px] lg:h-[700px] rounded-xl overflow-hidden shadow-lg">
            <iframe className="absolute top-0 left-0 w-full h-full" src={youtubeUrl} title={meal.strMeal} allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
