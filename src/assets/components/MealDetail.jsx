import { useEffect, useState } from "react";
import RelatedMeals from "./RelatedMeals.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MealDetail() {
  const { idMeal } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    if (!idMeal) return;

    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then((res) => {
        setMeal(res.data.meals[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando la comida:", err);
        setLoading(false);
      });
  }, [idMeal]); // 👈 vuelve a cargar si cambia el id

  if (loading) return <p>Cargando detalle...</p>;
  if (!meal) return <p>No se encontró la comida.</p>;

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
    <>
      <main className="max-w-[2000px] mx-auto px-12 py-4">
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-52 lg:h-96 object-cover" />

          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <h1 className="text-white text-3xl lg:text-5xl font-bold text-center px-4">{meal.strMeal}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
          <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6 order-1 lg:order-1">
            <h3 className="px-4 py-2 text-[#d87801] font-semibold text-3xl">Ingredientes</h3>
            <ul className="list-disc px-12 text-2xl marker:text-[#d87801]">
              {ingredients.map((ing, index) => (
                <li key={index}>{ing}</li>
              ))}
            </ul>

            <h3 className="px-4 py-2 text-[#d87801] font-semibold mt-6 text-3xl">Instrucciones</h3>
            <p className="text-2xl px-6">{meal.strInstructions}</p>
          </div>

          <aside className="bg-[#F2ECE1] rounded-xl shadow-md p-6 text-2xl order-3 lg:order-2 lg:row-span-2">
            <h2 className="font-bold text-gray-800 mb-4">Información</h2>
            <p>
              <span className="font-semibold">Categoría:</span> <span className="text-[#a49267] font-semibold">{meal.strCategory}</span>
            </p>
            <p>
              <span className="font-semibold">Cocina:</span> <span className="text-[#65921c] font-semibold">{meal.strArea}</span>
            </p>

            <h2 className="text-xl font-bold text-gray-800 mt-6 mb-2">Recetas Relacionadas</h2>
            <RelatedMeals category={meal.strCategory} currentMealId={meal.idMeal} />
          </aside>

          {/* Video en desktop */}
          <div className="order-2 lg:order-3 lg:col-span-3 ">
            <h2 className="text-3xl text-[#d87801] font-bold mb-2">Video Receta</h2>
            <div className="relative w-full h-64 sm:h-[450px] lg:h-[700px] rounded-xl overflow-hidden shadow-lg">
              <iframe className="absolute top-0 left-0 w-full h-full" src={youtubeUrl} title={meal.strMeal} allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
