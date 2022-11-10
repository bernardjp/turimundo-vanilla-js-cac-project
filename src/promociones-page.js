import { inicializarHeader } from "./ui/header/header.js";
import { inicializarPaquete } from "./ui/detallesPaquete.js";
import { inicializarModal } from "./ui/modal.js";

function inicializar() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  inicializarHeader();
  inicializarPaquete(id);
  inicializarModal();
}

inicializar();
