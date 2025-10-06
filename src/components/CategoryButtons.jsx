import { Link } from "react-router-dom";
import useMealDbCarousel from "../hooks/useMealDbCarousel"; // ajusta la ruta si tu hook está en otra carpeta

const CategoryButtons = () => {
  const {
    visibleData: categories,
    showPrev,
    showNext,
    isPrevDisabled,
    isNextDisabled,
    loading,
    error,
  } = useMealDbCarousel(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
    { default: 14, sm: 2, lg: 5 } // configuración responsive
  );

  if (loading) {
    return <p className="text-center py-4 text-gray-600">Loading categories...</p>;
  }

  if (error) {
    return <p className="text-center py-4 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="flex justify-center items-center gap-3 py-4 w-full">
      {/* Botón anterior */}
      <button
        onClick={showPrev}
        disabled={isPrevDisabled}
        className="rounded px-2 py-2 font-bold flex items-center disabled:opacity-50 disabled:cursor-not-allowed
             bg-[#e8c7a3] lg:hidden"
        style={{ background: "#e8c7a3" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <polygon points="15,6 9,12 15,18" fill="#d87801" />
        </svg>
      </button>

      {/* Categorías visibles */}
      {categories.map((cat) => (
        <Link key={cat.idCategory} to={`/filter.php/c/${cat.strCategory}`}>
          <button
            value={cat.strCategory}
            className="rounded px-4 py-2 font-semibold whitespace-nowrap"
            style={{ background: "#e8c7a3", color: "#d87801" }}
          >
            {cat.strCategory}
          </button>
        </Link>
      ))}

      {/* Botón siguiente */}
      <button
        onClick={showNext}
        disabled={isNextDisabled}
        className="rounded px-2 py-2 font-bold flex items-center disabled:opacity-50 disabled:cursor-not-allowed
             bg-[#e8c7a3] lg:hidden"
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <polygon points="9,6 15,12 9,18" fill="#d87801" />
        </svg>
      </button>
    </div>
  );
};

export default CategoryButtons;
