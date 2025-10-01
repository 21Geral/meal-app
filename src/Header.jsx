export default function Header() {
  return (
    <header className="bg-[#d87801] border-2 py-8 px-4 md:py-13">
      <div className="flex justify-between items-center relative">
        {/* Hamburguesa  mobile */}
        <input type="checkbox" id="menu-toggle" className="peer hidden " />
        <label
          htmlFor="menu-toggle"
          className="flex items-center justify-between h-10 w-12 md:hidden cursor-pointer relative z-50 active:scale-115 transform transition duration-200"
        >
          {/* Barras de la hamburguesa */}
          <div className="flex flex-col justify-between h-5 w-5  ">
            <span className="block h-[3px] w-full bg-[#930f01] rounded-full"></span>
            <span className="block h-[3px] w-full bg-[#930f01] rounded-full"></span>
            <span className="block h-[3px] w-full bg-[#930f01] rounded-full"></span>
          </div>
        </label>

        {/* Menu  mobile */}
        <section
          className="absolute top-full left-0 -translate-x-2 w-48
    bg-[#f08d24]/90 
    bg-cover bg-center border-3 border-[#b95e00] text-[#312929] rounded-xl overflow-hidden mt-2 
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
            <img src="/src/images/exit.png" alt="Cerrar" className="w-6 h-6" />
          </button>

          {/* Opciones menú mobile */}
          <div className="flex flex-col mt-12 text-2xl">
            <div className="px-4 py-2 cursor-pointer active:scale-105">
              Food
            </div>
            <div className="px-4 py-2 cursor-pointer active:scale-105">
              Entertainment
            </div>
            <div className="px-4 py-2 cursor-pointer active:scale-105">
              Blog
            </div>
            <div className="px-4 py-2 pb-10 cursor-pointer active:scale-105">
              Location
            </div>
          </div>
        </section>

        {/* Versión PC */}
        <div className="hidden md:flex md:flex-1 items-center justify-between">
          {/* Logo y nombre a la izquierda */}
          <div className="flex items-center gap-2">
            <img
              src="/src/images/logo.png"
              alt="Logo"
              className="h-16 w-auto"
            />
            <h1 className="text-xl text-[#930f01] font-bold">
              Mormones a la Barbacoa
            </h1>
          </div>

          {/* Navegación en el centro */}
          <ul className="flex gap-10 text-[#930f01] text-lg font-semibold">
            <li className="cursor-pointer hover:text-gray-200">Food</li>
            <li className="cursor-pointer hover:text-gray-200">
              Entertainment
            </li>
            <li className="cursor-pointer hover:text-gray-200">Blog</li>
          </ul>
        </div>

        {/* logo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none md:hidden">
          <img src="/src/images/logo.png" alt="Logo" className="h-16 w-auto" />
          <h1 className="text-xl text-[#930f01] font-bold">
            Mormones a la Barbacoa
          </h1>
        </div>
      </div>
    </header>
  );
}
