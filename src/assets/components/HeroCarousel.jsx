import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HeroCarousel() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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


  // --- Función para manejar la navegación ---
  const handleViewDetails = () => {
    // Asegúrate de que hay imágenes y que currentIndex es válido
    if (images.length > 0 && images[currentIndex] && images[currentIndex].idMeal) {
      const mealId = images[currentIndex].idMeal;
      // Navega a la ruta /meal/:mealId
      navigate(`/meal/${mealId}`);
    } else {
      console.error("No se pudo obtener el ID de la comida para navegar.");
      // Opcionalmente, podrías mostrar un mensaje de error al usuario
    }
  };


  // --- Renderizado Condicional ---
  if (loading) { 
    return (
      <div className="relative text-white h-110 bg-[url('/images/bg-img-hero.jpg')] bg-cover bg-center flex flex-col justify-center items-center text-xl">
        <div className="absolute top-[10%] w-[90%] young-serif-regular text-font- md:top-[20%] md:left-[12%] inset-0 flex flex-col justify-center items-center text-shadow-[0px_0px_2px] text-white md:w-[70%] h-[70%] mx-4 md:h-[60%] bg-[#070605]/25 rounded-4xl ">
          <h2 className="text-[3rem] text-center font-extrabold">¡Bienvenidos!</h2>
          <p className="text-2xl text-center">Es un placer contar con tu visita,</p>
          <p className="text-2xl text-center">esperamos que puedas disfrutar de nuestras variedades.</p>
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
            <div className="absolute top-[30%] md:top-[20%] md:left-[12%] inset-0 flex flex-col justify-center items-center text-shadow-[0px_0px_2px] text-white md:w-[70%] h-[40%] mx-8 md:h-[60%] bg-[#070605]/25 rounded-4xl px-2">
              {/*name*/}
              <h1 className="text-3xl md:text-5xl young-serif-regular font-bold mb-2 md:mb-6 lg:mb-8 text-center">{images[currentIndex].strMeal}</h1>
              {/*category*/}
              <p className="young-serif-regular text-md md:text-xl mb-2 md:mb-6 lg:mb-8 text-center text-shadow-[0px_0px_2px]">
                Categoría: {images[currentIndex].strCategory}
              </p>

              {/*navegr a pagina*/}
              <button onClick={handleViewDetails}
                className="young-serif-regular px-2 md:px-8 py-1 md:py-3 bg-[#f08d24] hover:bg-[#e79742] active:bg-[#f78539] hover:shadow-[0px_0px_4px] shadow-gray-50 text-white font-semibold rounded-lg transition duration-200"
              >
                How to Prepare It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroCarousel;
