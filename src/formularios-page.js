import { inicializarBotonCarrito } from "./ui/botonCarrito.js";
import { inicializarBotonBurgerMenu } from "./ui/botonBurgerMenu.js";
import { inicializarFormulario } from "./form/formulario.js";
import { inicializarNavbar } from "./ui/headerNavbar.js";

function inicializar() {
  inicializarNavbar();
  inicializarBotonCarrito();
  inicializarBotonBurgerMenu();
  inicializarFormulario();
}

inicializar();
