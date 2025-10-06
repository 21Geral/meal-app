import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMealDbCarousel from "../hooks/useMealDbCarousel"; // ajusta la ruta según tu estructura

function HeroCarousel() {
  const navigate = useNavigate();

  // Vamos a crear una URL especial que devuelva 5 comidas aleatorias concatenadas
  // (esto no existe directamente en la API, así que simulamos con nuestro hook y un endpoint "virtual")
  const RANDOM_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

  // Hook para manejar las comidas, visibleCount = 1 porque solo queremos mostrar una imagen a la vez
  const { visibleData, loading, error } = useMealDbCarousel(
    `/custom-random-carousel`, // clave única para el cache
    { default: 1, sm: 1, lg: 1 }
  );

  const [images, setImages] = useState([]);

  // Fetch manual para traer 5 comidas aleatorias y almacenarlas en sessionStorage usando la misma clave que el hook
  useEffect(() => {
    const cacheKey = `carousel-/custom-random-carousel`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      setImages(JSON.parse(cached));
      return;
    }

    const fetchRandomMeals = async () => {
      try {
        const requests = Array.from({ length: 5 }, () => fetch(RANDOM_URL).then((r) => r.json()));
        const responses = await Promise.all(requests);
        const meals = responses.map((r) => r.meals?.[0]).filter(Boolean);
        sessionStorage.setItem(cacheKey, JSON.stringify(meals));
        setImages(meals);
      } catch (err) {
        console.error("Error fetching random meals", err);
      }
    };

    fetchRandomMeals();
  }, []);

  // Control automático de cambio de imagen cada 5 segundos
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const currentImage = images[currentIndex];

  const handleViewDetails = () => {
    if (currentImage?.idMeal) {
      navigate(`/meal/${currentImage.idMeal}`);
    }
  };

  // --- Renderizado ---

  if (error) {
    return <div className="h-screen flex justify-center items-center text-xl text-red-500 text-center p-4">{error}</div>;
  }

  if (!currentImage) {
    return (
      <div className="relative text-white h-110 bg-[url('/images/bg-img-hero.jpg')] bg-cover bg-center flex flex-col justify-center items-center text-xl">
        <div className="absolute top-[10%] w-[90%] md:top-[20%] md:left-[12%] inset-0 flex flex-col justify-center items-center text-white md:w-[70%] h-[70%] mx-4 md:h-[60%] bg-[#070605]/25 rounded-4xl">
          <h2 className="text-[3rem] text-center font-extrabold">¡Bienvenidos!</h2>
          <p className="text-2xl text-center">Es un placer contar con tu visita,</p>
          <p className="text-2xl text-center">esperamos que puedas disfrutar de nuestras variedades.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-110 overflow-hidden">
      <div key={currentImage.idMeal} className="absolute inset-0 w-full h-full transition-opacity duration-700 opacity-100">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: currentImage.strMealThumb ? `url("${currentImage.strMealThumb}")` : undefined,
            backgroundColor: currentImage.strMealThumb ? undefined : "#374151",
          }}
        >
          <div className="absolute top-[30%] md:top-[20%] md:left-[12%] inset-0 flex flex-col justify-center items-center text-white md:w-[70%] h-[40%] mx-8 md:h-[60%] bg-[#070605]/25 rounded-4xl px-2">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">{currentImage.strMeal}</h1>
            <button
              onClick={handleViewDetails}
              className="px-4 md:px-8 py-2 md:py-3 bg-[#f08d24] hover:bg-[#e79742] active:bg-[#f78539] hover:shadow-[0px_0px_4px] shadow-gray-50 text-white font-semibold rounded-lg transition duration-200"
            >
              How to Prepare It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;
