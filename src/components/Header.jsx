import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };
  const scrollToCategory = () => {
    window.scrollBy({ top: 550, behavior: "smooth" });
    closeMenu();
  };

  return (
    <header className="bg-[#8B2E2E] py-8 px-4">
      <div className="flex justify-between items-center relative">
        {/* Hamburguesa mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative z-50 flex items-center justify-center h-10 w-12 cursor-pointer active:scale-110 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10 text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Menú mobile */}
        {isMenuOpen && (
          <section
            className="absolute top-full left-0 -translate-x-2 w-48
              bg-[#8B2E2E]/85 border border-[#930f01] text-white rounded-xl mt-2 
              opacity-100 scale-100 transition-all duration-300 z-40 md:hidden"
          >
            {/* Botón de cierre */}
            <button onClick={closeMenu} className="absolute top-1 right-2.5 rounded-full active:scale-110">
              <img src="/images/exit.png" alt="Cerrar" className="w-6 h-6" loading="lazy" />
            </button>
            {/* Buscador Mobile */}
            <div className="mt-8 text-black">
              <Search mobile />
            </div>

            {/* Opciones */}
            <nav className="flex flex-col mt-5 text-2xl">
              <Link to="/" onClick={closeMenu} className="px-4 pb-2 active:scale-105">
                Home
              </Link>
              <button onClick={scrollToCategory} className="text-left px-4 py-2 active:scale-105">
                Category
              </button>
              <Link to="/location" onClick={closeMenu} className="px-4 py-2 active:scale-105">
                Location
              </Link>
              <button onClick={scrollToBottom} className="text-left px-4 py-2 pb-10 active:scale-105">
                Contact
              </button>
            </nav>
          </section>
        )}

        {/* Versión PC */}
        <div className="hidden md:flex md:flex-1 items-center justify-between pl-10">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="h-16 w-auto" loading="lazy" />
            <h1 className="text-3xl text-white font-bold">Gourmet Recipe</h1>
          </Link>

          <ul className="flex gap-10 text-white font-semibold text-2xl pr-10">
            <li>
              <Link to="/" className="hover:text-gray-200">
                Home
              </Link>
            </li>
            <li>
              <button onClick={scrollToCategory} className="hover:text-gray-200">
                Category
              </button>
            </li>
            <li>
              <Link to="/location" className="hover:text-gray-200">
                Location
              </Link>
            </li>
            <li>
              <button onClick={scrollToBottom} className="hover:text-gray-200">
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Logo centrado mobile */}
        <Link to="/" className="absolute inset-0 flex flex-col items-center justify-center md:hidden z-30">
          <img src="/images/logo.png" loading="lazy" alt="Logo" className="h-16 w-auto" />
          <h1 className="text-xl text-white font-bold">Gourmet Recipe</h1>
        </Link>
      </div>
    </header>
  );
}
