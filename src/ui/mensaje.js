function renderizarMensaje(texto) {
  const elementoMensaje = document.getElementById("mensaje");
  elementoMensaje.textContent = texto;

  if (texto) {
    elementoMensaje.style.display = "flex";
  } else {
    elementoMensaje.style.display = "none";
  }
}

function renderizarAlertaFormulario(texto) {
  Swal.fire({
    title: "Campo incompleto",
    text: texto,
    icon: "error"
  })
}

export { renderizarMensaje, renderizarAlertaFormulario };
