import { validacionContacto, validacionViaje } from "./validaciones.js";

function inicializarFormulario() {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => submitHandler(e));
}

function submitHandler(e) {
  e.preventDefault();

  const formType = form.dataset.type;
  let formValido;
  if (formType === "viaje") formValido = validacionViaje();
  if (formType === "contacto") formValido = validacionContacto();
  
  if (formValido) {
    const data = new FormData(e.target);

    fetch(e.target.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => { 
        if(res.ok) {
          form.reset();
          Swal.fire({
            title: "Tu mensaje fue enviado!",
            text: "Gracias por contactarte, nos comunicaremos con vos a la brevedad.",
            icon: "success"
          });
        }
      })
      .catch(error => {
        Swal.fire({
          title: "Tu mensaje no pudo ser enviado",
          text: "Ha surgido un error en el envío de tu mensaje. Por favor intenta más tarde.",
          icon: "error"
        });
      })
  }
}

export { inicializarFormulario };
