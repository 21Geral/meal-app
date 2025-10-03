import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";
import { Routes, Route, useLocation } from "react-router-dom";
import CategoryButtons from "./components/CategoryButtons";
import LocationButtons from "./components/locationButtons";
import Cards from "./components/cards";
import Home from "./pages/home";
import CategoriesCards from "./pages/categories-Cards";
import Location from "./pages/location";
import HeroCarousel from "./components/HeroCarousel";
import MealDetail from "./components/MealDetail";

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
