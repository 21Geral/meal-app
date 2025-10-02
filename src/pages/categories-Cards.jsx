import { useParams } from "react-router-dom";
import Cards from "../assets/components/cards";

export default function CategoriesCards() {
  const { categoryName } = useParams();

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6  pt-5" style={{ color: "#d87801" }}>
        {categoryName}
      </h2>
      <Cards endpoint={`filter.php?c=${categoryName}`} />
    </div>
  );
}
