import { obtenerItemsLocalStorage } from "../storage/local-storage.js";

function inicializarBotonCarrito() {
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const contadores = document.querySelectorAll(".header-cart-counter");
  const itemsLS = obtenerItemsLocalStorage();
  
  if (itemsLS) {
    contadores.forEach(contador => {
      contador.style.display = "flex";
      contador.textContent = itemsLS.length;
    })
  } else {
    contadores.forEach(contador =>  contador.style.display = "none");
  }
}

export { inicializarBotonCarrito, actualizarContadorCarrito };
