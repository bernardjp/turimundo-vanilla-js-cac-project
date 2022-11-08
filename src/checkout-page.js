import { inicializarCheckout } from "./ui/carrito.js";
import { inicializarBotonCarrito } from "./ui/botonCarrito.js";
import { inicializarBotonBurgerMenu } from "./ui/botonBurgerMenu.js";
import { inicializarNavbar } from "./ui/headerNavbar.js";

function inicializar() {
  inicializarNavbar();
  inicializarBotonBurgerMenu();
  inicializarBotonCarrito();
  inicializarCheckout();
}

inicializar();
