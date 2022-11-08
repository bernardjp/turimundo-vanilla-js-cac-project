import { inicializarCarrusel } from "./ui/carrusel.js";
import { inicializarBotonBurgerMenu } from "./ui/botonBurgerMenu.js";
import { inicializarBotonCarrito } from "./ui/botonCarrito.js";
import { inicializarNavbar } from "./ui/headerNavbar.js";

function inicializar() {
  inicializarNavbar();
  inicializarCarrusel();
  inicializarBotonBurgerMenu();
  inicializarBotonCarrito();
}

inicializar();
