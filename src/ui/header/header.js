import { inicializarBotonBurgerMenu } from "./botonBurgerMenu.js";
import { inicializarNavbar } from "./navbar.js";
import { inicializarBotonCarrito } from "./botonCarrito.js";

function inicializarHeader() {
  inicializarNavbar();
  inicializarBotonBurgerMenu();
  inicializarBotonCarrito();
}

export { inicializarHeader };
