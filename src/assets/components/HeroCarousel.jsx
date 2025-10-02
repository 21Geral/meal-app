import React, { useState, useEffect } from "react";
import axios from "axios";

function HeroCarousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL_RANDOM_MEAL = "https://www.themealdb.com/api/json/v1/1/random.php";
  const NUMBER_OF_IMAGES = 5;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        const mealsArray = [];
        // Realizamos múltiples llamadas para obtener un array de comidas
        for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
          const response = await axios.get(API_URL_RANDOM_MEAL);
          if (response.data.meals && response.data.meals.length > 0) {
            mealsArray.push(response.data.meals[0]);
          } else {
            // Si una llamada falla o no devuelve comida, podemos omitirla o manejarla
            console.warn(`No meal received on iteration ${i + 1}`);
          }
        }
        console.log("comida obtenida:", mealsArray);
        setImages(mealsArray.filter((meal) => meal));
      } catch (err) {
        console.error(err);
        setError("No se pueden traer las imágenes. Por favor, verifica la URL de la API y tu conexión.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []); // Se ejecuta solo una vez al montar

  // Lógica para el carrusel automático
  useEffect(() => {
    // Solo inicia el intervalo si hay imágenes y no estamos cargando ni hay error
    if (images.length > 0 && !loading && !error) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [images, loading, error]);

  // --- Renderizado Condicional ---
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        <div role="status" className="flex flex-col justify-center items-center">
          <svg
            aria-hidden="true"
            className="inline w-24 h-24 text-gray-200 animate-spin dark:text-gray-100 fill-[#f08d24]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only bg-[#ffa94d]">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="h-screen flex justify-center items-center text-xl text-red-500 text-center p-4">{error}</div>;
  }

  if (images.length === 0) {
    return <div className="h-screen flex justify-center items-center text-xl">No hay imágenes disponibles para mostrar.</div>;
  }

  // --- Renderizado del Carrusel ---
  return (
    <div className="relative w-full h-110 overflow-hidden">
      {images.length > 0 && (
        <div
          key={images[currentIndex].idMeal}
          className=" absolute inset-0 w-full h-full transition-opacity duration-700 opacity-100"
          style={{ zIndex: 1 }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: images[currentIndex].strMealThumb ? `url("${images[currentIndex].strMealThumb}")` : undefined,
              backgroundColor: images[currentIndex].strMealThumb ? undefined : "#374151",
            }}
          >
            {/* Overlay */}
            <div className=" absolute top-[30%] md:top-[20%] md:left-[12%] inset-0 flex flex-col justify-center items-center text-shadow-[0px_0px_2px] text-white md:w-[70%] h-[40%] mx-8 md:h-[60%] bg-[#f08d24]/60 rounded-4xl ">
              {/*name*/}
              <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-6 lg:mb-8 text-center">{images[currentIndex].strMeal}</h1>
              {/*category*/}
              <p className="text-md md:text-xl mb-2 md:mb-6 lg:mb-8 text-center text-shadow-[0px_0px_2px]">
                Categoría: {images[currentIndex].strCategory}
              </p>

              {/*AQUI QUEDA POR TRABAJAR REDIRECCIONANDO A LAS PAGINAS*/}
              <a
                href={images[currentIndex].strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 md:px-8 py-1 md:py-3 bg-[#f08d24] hover:bg-[#e79742] active:bg-[#f78539] hover:shadow-[0px_0px_4px] shadow-gray-50 text-white font-semibold rounded-lg transition duration-200"
              >
                How to Prepare It
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroCarousel;
