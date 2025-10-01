import React from "react";
import { Routes, Route } from "react-router-dom";
import CategoryButtons from "./components/CategoryButtons";
import Cards from "./components/cards";
import Home from "./pages/home";
import CategoriesCards from "./pages/categories-Cards"; // Importa el nuevo archivo

export default function App() {
  return (
    <div>
      <CategoryButtons />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filter.php" element={<Cards />} />
        <Route
          path="/filter.php/c/:categoryName"
          element={<CategoriesCards />}
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}
