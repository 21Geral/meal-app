import { Link } from "react-router-dom";
import useMealDbCarousel from "../hooks/useMealDbCarousel";

const LocationButtons = () => {
  const {
    visibleData: areas,
    showPrev,
    showNext,
    isPrevDisabled,
    isNextDisabled,
    loading,
    error,
  } = useMealDbCarousel("https://www.themealdb.com/api/json/v1/1/list.php?a=list", { default: 10, sm: 2, lg: 5 });

  if (loading) {
    return <p className="text-center py-4 text-gray-600">Loading locations...</p>;
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
        className="rounded px-2 py-2 font-bold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "#e8c7a3" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <polygon points="15,6 9,12 15,18" fill="#d87801" />
        </svg>
      </button>

      {/* Áreas visibles */}
      {areas.map((area, idx) => (
        <Link key={idx} to={`/location/${area.strArea}`}>
          <button
            value={area.strArea}
            className="rounded px-4 py-2 font-semibold whitespace-nowrap"
            style={{ background: "#e8c7a3", color: "#d87801" }}
          >
            {area.strArea}
          </button>
        </Link>
      ))}

      {/* Botón siguiente */}
      <button
        onClick={showNext}
        disabled={isNextDisabled}
        className="rounded px-2 py-2 font-bold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "#e8c7a3" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <polygon points="9,6 15,12 9,18" fill="#d87801" />
        </svg>
      </button>
    </div>
  );
};

export default LocationButtons;
