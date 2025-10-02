export default function Search() {
  return (
    <div className="hidden md:flex justify-center w-full mb-6 py-5">
      <form className="form relative w-full max-w-md">
        {/* Botón lupa */}
        <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
            className="w-5 h-5 text-gray-600"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>

        {/* Input */}
        <input
          className="input rounded-full px-8 py-3 
                     border border-gray-300 bg-gray-100
                     focus:outline-none focus:border-[#d87801] 
                     placeholder-gray-500 transition-all duration-300 shadow-md w-full"
          placeholder="Search recipes..."
          required
          type="text"
        />
      </form>
    </div>
  );
}
