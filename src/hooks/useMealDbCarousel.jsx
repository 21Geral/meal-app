import axios from "axios";
import { useEffect, useState } from "react";

/**
 * Hook personalizado para crear un carrusel desde la API de TheMealDB.
 * Obtiene datos de una URL dada y proporciona funcionalidad para un carrusel.
 *
 * @param {string} url La URL de la que se obtendrán los datos de la API de TheMealDB. Se utiliza en componentes como CategoryButtons y LocationButtons.
 * @param {object} visibleCountConfig Un objeto para configurar el número de elementos visibles según el tamaño de la pantalla.
 * @param {number} visibleCountConfig.default El número predeterminado de elementos visibles.
 * @param {number} visibleCountConfig.sm El número de elementos visibles en pantallas pequeñas (menos de 640px).
 * @param {number} visibleCountConfig.lg El número de elementos visibles en pantallas grandes (menos de 1024px).
 * @returns {object} Un objeto que contiene los datos visibles y los controles del carrusel.
 * @property {Array} visibleData El array de elementos que se mostrarán en el carrusel. Se llama en CategoryButtons y LocationButtons.
 * @property {Function} showPrev Una función para mostrar el conjunto anterior de elementos. Se llama en CategoryButtons y LocationButtons.
 * @property {Function} showNext Una función para mostrar el siguiente conjunto de elementos. Se llama en CategoryButtons y LocationButtons.
 * @property {boolean} isPrevDisabled Un booleano que indica si el botón "anterior" debe estar deshabilitado. Se llama en CategoryButtons y LocationButtons.
 * @property {boolean} isNextDisabled Un booleano que indica si el botón "siguiente" debe estar deshabilitado. Se llama en CategoryButtons y LocationButtons.
 */
const useMealDbCarousel = (url, visibleCountConfig) => {
  // Estado para almacenar los datos obtenidos de la API.
  const [data, setData] = useState([]);
  // Estado para realizar un seguimiento del índice de inicio de los elementos visibles.
  const [startIdx, setStartIdx] = useState(0);
  // Estado para almacenar el ancho actual de la ventana para el comportamiento receptivo.
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Efecto para obtener datos de la API cuando cambia la URL.
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        // La respuesta de la API tiene una única clave con un array de datos (por ejemplo, { meals: [...] } o { categories: [...] }).
        // Esto encuentra la primera propiedad en los datos de respuesta que es un array.
        const dataArray = Object.values(res.data).find(Array.isArray);
        setData(dataArray || []);
      })
      .catch((err) => console.log(err.message));
  }, [url]);

  // Efecto para manejar el redimensionamiento de la ventana para el recuento de elementos receptivos.
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // Función de limpieza para eliminar el detector de eventos.
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determina el número de elementos visibles según el ancho de la ventana.
  let visibleCount = visibleCountConfig.default;
  if (windowWidth < 640) {
    visibleCount = visibleCountConfig.sm;
  } else if (windowWidth < 1024) {
    visibleCount = visibleCountConfig.lg;
  }

  // Función para mostrar los elementos anteriores en el carrusel.
  const showPrev = () => setStartIdx(Math.max(0, startIdx - visibleCount));
  // Función para mostrar los siguientes elementos en el carrusel.
  const showNext = () =>
    setStartIdx(
      Math.min(data.length - visibleCount, startIdx + visibleCount)
    );

  // Corta el array de datos para obtener los elementos actualmente visibles.
  const visibleData = data.slice(startIdx, startIdx + visibleCount);

  // Devuelve los datos visibles y las funciones de control al componente.
  return {
    visibleData,
    showPrev,
    showNext,
    isPrevDisabled: startIdx === 0,
    isNextDisabled: startIdx + visibleCount >= data.length,
  };
};

export default useMealDbCarousel;
