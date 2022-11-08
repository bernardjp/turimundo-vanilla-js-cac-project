import { PaqueteCard } from "./componentes/PaqueteCard.js";
import { renderizarMensaje } from "./mensaje.js";

async function inicializarListadoPaquetes(data) {
  renderizarListadoPaquetes(data);
}

function renderizarListadoPaquetes(listadoPaquetes) {
  eliminarListadoPaquetes();

  let { paquetes } = listadoPaquetes;

  if (paquetes.length === 0) {
    renderizarMensaje("No se han encontrado paquetes.");
  } else {
    renderizarMensaje();
    paquetes.forEach(paquete => renderizarPaquete(paquete))
  }
}

function renderizarPaquete(dataPaquete) {
  const elementoContenedor = document.getElementById("grilla-paquetes");

  const paqueteMapeado = new PaqueteCard(dataPaquete);
  const paqueteElementoCard = paqueteMapeado.crearElemento();
  
  elementoContenedor.appendChild(paqueteElementoCard);
}

function eliminarListadoPaquetes() {
  const grilla = document.getElementById("grilla-paquetes");

  while (grilla.childElementCount > 0) {
    grilla.removeChild(grilla.lastElementChild);
  }
}

export { inicializarListadoPaquetes, renderizarListadoPaquetes };
