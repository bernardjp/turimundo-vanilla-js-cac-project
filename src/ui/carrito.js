import { obtenerDataDeJSON } from "../storage/jsonDataFetching.js";
import { ArticuloCarrito } from "./componentes/ArticuloCarrito.js";
import { obtenerItemsLocalStorage, eliminarItemLocalStorage } from "../storage/local-storage.js";
import { renderizarMensaje } from "./mensaje.js";
import { calcularCosto } from "../utils/calcularCosto.js";
import { mapearArticulosConCantidad, mapearArticulosConCosto } from "../utils/filtros-mappers.js";

async function inicializarCheckout() {
  const data = await obtenerDataDeJSON();
  actualizarCarrito(data);
}

function actualizarCarrito(data) {
  const { paquetes } = data;
  const articulosEnCarrito = obtenerItemsLocalStorage();
  renderizarMensaje();

  if (articulosEnCarrito === null) {
    renderizarMensaje("No hay artículos en el Carrito.");
    renderizarDetalleCheckout([], { costo: 0, impuestos: 0 });
    botonCajaHandler("Carrito vacío", "Prueba agregando algún paquete.", "error");
    return;
  }

  const dataArticulosEnCarrito = mapearArticulosConCantidad(articulosEnCarrito, paquetes);
  const articulosConCosto = mapearArticulosConCosto(dataArticulosEnCarrito);
  const costoTotal = calcularCosto(articulosConCosto);
  
  renderizarArticulosCarrito(dataArticulosEnCarrito);
  renderizarDetalleCheckout(articulosConCosto, costoTotal);
  botonCajaHandler("Gracias por su compra!", "Les deseamos una hermosa experiencia.", "success");
}

function renderizarArticulosCarrito(dataArticulos) {
  const listadoContenedor = document.getElementById("cart-list");

  const eliminarArticuloCallBack = (e) => {
    const itemID = e.target.dataset.id;
    eliminarItemLocalStorage(itemID);
    window.location.reload();
  }

  dataArticulos.forEach(articulo => {
    const articuloMapeado = new ArticuloCarrito(articulo, eliminarArticuloCallBack);
    const articuloElemento = articuloMapeado.crearElemento();

    listadoContenedor.appendChild(articuloElemento);    
  })
};

function renderizarDetalleCheckout(articulosConCosto, costoTotal) {
  const { costo, impuestos } = costoTotal;
  const formatearMoneda = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  const listadoArticulos = document.getElementById("articulos-listado");
  const subtotalElemento = document.getElementById("costo-subtotal");
  const impuestosElemento = document.getElementById("costo-impuestos");
  const totalElemento = document.getElementById("costo-total");
  
  articulosConCosto.forEach(articulo => {
    const articuloElemento = document.createElement("div");
    articuloElemento.className = "cart-sidebar-pack-item";
  
    articuloElemento.innerHTML = `
      <span>${articulo.nombre}</span>
      <span>${articulo.cantidad} x ${formatearMoneda.format(articulo.precio)}</span>
    `;

    listadoArticulos.appendChild(articuloElemento);
  })

  subtotalElemento.textContent = formatearMoneda.format(costo);
  impuestosElemento.textContent = formatearMoneda.format(impuestos);
  totalElemento.textContent = formatearMoneda.format(costo + impuestos);
};

function eliminarArticulosCarrito() {
  const listado = document.getElementById("cart-list");

  while (listado.childElementCount > 0) {
    listado.removeChild(listado.lastChild);
  }
}

function botonCajaHandler(titulo, mensaje, compraSatisfactoria) {
  const boton = document.querySelector(".cart-sidebar-btn");
  
  boton.addEventListener("click", () => {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: compraSatisfactoria
    });

    if (compraSatisfactoria === "success") {
      eliminarArticulosCarrito();
      localStorage.clear();

      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  })
}

export { inicializarCheckout };
