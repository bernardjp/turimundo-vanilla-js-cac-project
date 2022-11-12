import { PaqueteDetalle } from "./componentes/PaqueteDetalle.js";
import { obtenerDataDeJSON } from "../storage/jsonDataFetching.js";
import { agregarALocalStorage } from "../storage/local-storage.js";
import { filtrarItems } from "../utils/filtros-mappers.js";
import { actualizarContadorCarrito } from "./header/botonCarrito.js";
import { renderizarMensaje } from "./mensaje.js";
import { modalHandler } from "./modal.js";

async function inicializarPaquete(id) {
  const data = await obtenerDataDeJSON();
  const [paqueteData] = filtrarItems(data.paquetes, "id", id);

  if (paqueteData) {
    renderizarMensaje();
    renderizarDetallesPaquete(paqueteData);
  } else {
    renderizarMensaje("No se ha encontrado ningún paquete. Vuelva a intentar en otro momento.");
  }
}

function renderizarDetallesPaquete(dataPaquete) {
  const seccionDetallePaquete = document.querySelector("#pack-details");

  const agregarACarritoCB = (e) => {
    e.preventDefault();

    const cantidad = document.getElementById("cantidad-pasajes").value;

    if (cantidad) {
      const id = document.getElementById("pack-details-container").dataset.id;
      const paquete = { id, cantidad: parseInt(cantidad) };
  
      agregarALocalStorage(paquete);
      actualizarContadorCarrito();
  
      Swal.fire({
        title: "Agregado al carrito",
        text: `${dataPaquete.nombre} se ha agregado al carrito de compras.`,
        icon: "success"
      });

    } else {
      Swal.fire({
        title: "",
        text: "Prueba seleccionando cuantos pasajes deseas y luego agrégalos al carrito",
        icon: "error"
      });
    }
  }

  const detallesPaqueteMapeado = new PaqueteDetalle(dataPaquete, agregarACarritoCB, modalHandler);
  const detallesElemento = detallesPaqueteMapeado.crearElemento();
  seccionDetallePaquete.appendChild(detallesElemento);
}

export { inicializarPaquete };
