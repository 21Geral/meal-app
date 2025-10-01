import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Search from "./Search";
import { Routes, Route, useLocation } from "react-router-dom";
import CategoryButtons from "./components/CategoryButtons";
import LocationButtons from "./components/locationButtons";
import Cards from "./components/cards";
import Home from "./pages/home";
import CategoriesCards from "./pages/categories-Cards";
import Location from "./pages/location";
import HeroCarousel from "./components/HeroCarousel"

export default function App() {
  const location = useLocation();

  return (
    <>
    <Header />
      <br />
      <Search />
      <Footer />
    <div>
     <HeroCarousel/>
      {/* Solo muestra CategoryButtons si NO estamos en /location */}
      {!location.pathname.startsWith("/location") && <CategoryButtons />}
      {/* Solo muestra LocationButtons si estamos en /location */}
      {location.pathname.startsWith("/location") && <LocationButtons />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter.php" element={<Cards />} />
        <Route
          path="/filter.php/c/:categoryName"
          element={<CategoriesCards />}
        />
        <Route path="/location/:areaName" element={<Location />} />
        <Route path="*" element={<Home />} />
      </Routes>

    </div>
        </>
  );
}
