export default function Header() {
  return (
    <header className="bg-[#8B2E2E] py-8 px-4">
      <div className="flex justify-between items-center relative">
        {/* Hamburguesa mobile */}
        <input type="checkbox" id="menu-toggle" className="peer hidden" />
        <label
          htmlFor="menu-toggle"
          className="flex items-center justify-between h-10 w-12 md:hidden cursor-pointer relative z-50 active:scale-115 transform transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </label>

        {/* Menú mobile */}
        <section
          className="absolute top-full left-0 -translate-x-2 w-48
            bg-[#8B2E2E]/85 
            bg-cover bg-center border-3 border-[#930f01] text-white rounded-xl overflow-hidden mt-2 
            opacity-0 scale-95 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-300 z-50
            md:hidden"
        >
          {/* Botón de cierre */}
          <button
            className="absolute top-1 end-2.5 rounded-full active:scale-115 translate-x-2"
            onClick={() => {
              const input = document.getElementById("menu-toggle");
              if (input) input.checked = false;
            }}
          >
            <img
              src="/public/images/exit.png"
              alt="Cerrar"
              className="w-6 h-6"
            />
          </button>

          {/* Opciones menú mobile */}
          <div className="flex flex-col mt-5 text-2xl">
            <div
              onClick={() => {
                window.location.href = "/";
              }}
              className="px-4 py-2 cursor-pointer active:scale-105"
            >
              Home
            </div>

            <div
              onClick={() => {
                window.scrollBy({ top: 550, behavior: "smooth" });

                const input = document.getElementById("menu-toggle");
                if (input) input.checked = false;
              }}
              className="px-4 py-2 cursor-pointer active:scale-105"
            >
              Category
            </div>
            <li
              onClick={() => (window.location.href = "/location")}
              className="px-4 py-2 cursor-pointer active:scale-105"
            >
              Location
            </li>
            <div
              onClick={() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });

                const input = document.getElementById("menu-toggle");
                if (input) input.checked = false;
              }}
              className="px-4 py-2 pb-10 cursor-pointer active:scale-105"
            >
              Contact
            </div>
          </div>
        </section>

        {/* Versión PC */}
        <div className="hidden md:flex md:flex-1 items-center justify-between pl-10">
          {/* Logo y nombre a la izquierda */}
          <div className="flex items-center gap-2">
            <img
              src="/public/images/logo.png"
              alt="Logo"
              className="h-16 w-auto"
            />
            <h1 className="text-3xl text-white font-bold">Gourmet Recipe</h1>
          </div>

          {/* recarga la pag pc*/}
          <ul className="flex gap-10 text-white font-semibold text-2xl pr-10">
            <li
              onClick={() => (window.location.href = "/")}
              className="cursor-pointer hover:text-gray-200"
            >
              Home
            </li>
            <li
              onClick={() => window.scrollBy({ top: 580, behavior: "smooth" })}
              className="cursor-pointer hover:text-gray-200"
            >
              Category
            </li>
            <li
              onClick={() => (window.location.href = "/location")}
              className="cursor-pointer hover:text-gray-200"
            >
              Location
            </li>
            <li
              onClick={() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }}
              className="cursor-pointer hover:text-gray-200"
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Logo centrado mobile */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none md:hidden">
          <img
            src="/public/images/logo.png"
            alt="Logo"
            className="h-16 w-auto"
          />
          <h1 className="text-xl text-white font-bold">Gourmet Recipe</h1>
        </div>
      </div>
    </header>
  );
}
