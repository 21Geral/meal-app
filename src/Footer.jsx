export default function Footer() {
  return (
    <footer className="bg-[#d87801] border-2 py-6 px-4">
      <div className="container mx-auto flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row w-full items-center justify-between">
          <div className="w-full md:w-1/3 text-center md:text-left order-3 md:order-1 mb-6 md:mb-0">
            <p className="text-sm">© 2025 Mormones a la Barbacoa.</p>
          </div>

          <div className="w-full md:w-1/3 text-center order-1 md:order-2 mb-6 md:mb-0 ">
            <h3 className="text-lg font-bold mb-2">Mis Redes</h3>
            <div className="flex justify-center space-x-4">
              <a
                className="active:scale-140"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/src/images/face.png"
                  alt="Facebook"
                  className="h-8 w-8"
                />
              </a>
              <a
                className="active:scale-140"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/src/images/twitterx.png"
                  alt="Twitter"
                  className="h-8 w-8"
                />
              </a>
              <a
                className="active:scale-140"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/src/images/instagram.png"
                  alt="Instagram"
                  className="h-8 w-8"
                />
              </a>
              <a
                className="active:scale-140"
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/src/images/youtube.png"
                  alt="YouTube"
                  className="h-8 w-8"
                />
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/3 text-center md:text-right order-2 md:order-3">
            <h3 className="text-lg font-bold mb-2">Contáctanos</h3>
            <div className="text-sm space-y-1">
              <p>Línea fija: 02229 456-789</p>
              <p>WhatsApp: +54 9 11 1555-6677</p>
              <p>Correo: contacto@mormonesalabq.example</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
