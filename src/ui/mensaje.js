function renderizarMensaje(texto) {
  const elementoMensaje = document.getElementById("mensaje");
  elementoMensaje.textContent = texto;

  if (texto) {
    elementoMensaje.style.display = "flex";
  } else {
    elementoMensaje.style.display = "none";
  }
}

export { renderizarMensaje };
