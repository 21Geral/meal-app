import Footer from "./assets/components/Footer";
import Header from "./assets/components/Header";
import Search from "./assets/components/Search";
import { Routes, Route, useLocation } from "react-router-dom";
import CategoryButtons from "./assets/components/CategoryButtons";
import LocationButtons from "./assets/components/locationButtons";
import Cards from "./assets/components/cards";
import Home from "./pages/home";
import CategoriesCards from "./pages/categories-Cards";
import Location from "./pages/location";
import HeroCarousel from "./assets/components/HeroCarousel";
import MealDetail from "./assets/components/MealDetail";

export default function App() {
  const location = useLocation();

  const hideExtras = location.pathname.startsWith("/meal");

  return (
    <>
      <Header />

      {!hideExtras && (
        <>
          <HeroCarousel />
          <Search />
          {!location.pathname.startsWith("/location") && <CategoryButtons />}
          {location.pathname.startsWith("/location") && <LocationButtons />}
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter.php" element={<Cards />} />
        <Route path="/filter.php/c/:categoryName" element={<CategoriesCards />} />
        <Route path="/location/:areaName" element={<Location />} />
        <Route path="/meal/:idMeal" element={<MealDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}
