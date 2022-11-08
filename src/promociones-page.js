import { inicializarPaquete } from "./ui/detallesPaquete.js";
import { inicializarBotonCarrito } from "./ui/botonCarrito.js";
import { inicializarBotonBurgerMenu } from "./ui/botonBurgerMenu.js";
import { inicializarModal } from "./ui/modal.js";
import { inicializarNavbar } from "./ui/headerNavbar.js";

function inicializar() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  inicializarNavbar();
  inicializarPaquete(id);
  inicializarBotonCarrito();
  inicializarBotonBurgerMenu();
  inicializarModal();
}

window.addEventListener('load', inicializar);
