import { renderizarAlertaFormulario } from "../ui/mensaje.js";

// Valores fijos.
const MAX_CHAR = 255;
const MIN_CHAR = 0;
const MONTO_MIN = 1;
const MONTO_MAX = 100000000;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|ar|edu)+$/;

// Helper-functions para validaciones.
const validarCaracteresMinimos = string => (string.length <= MIN_CHAR || string === null);
const validarCaracteresMaximos = (string, max = MAX_CHAR) => string.length > max;
const validarFormatoEmail = email => !(EMAIL_REGEX.test(email));

// Validacion de campos.
const validarNombre = () => {
  const nombre = document.getElementById("nombre").value;
  if(validarCaracteresMinimos(nombre)) {
    renderizarAlertaFormulario("Debe completar el nombre");
    return false;
  }

  if(validarCaracteresMaximos(nombre)) {
    renderizarAlertaFormulario(`El nombre no debe exceder los ${MAX_CHAR} caracteres. (actualmente ${nombre.length})`);
    return false;
  }

  return true;
}

const validarApellido = () => {
  const apellido = document.getElementById("apellido").value;
  if(validarCaracteresMinimos(apellido)) {
    renderizarAlertaFormulario("Debe completar el apellido");
    return false;
  }

  if(validarCaracteresMaximos(apellido)) {
    renderizarAlertaFormulario(`El apellido no debe exceder los ${MAX_CHAR} caracteres. (actualmente ${apellido.length})`);
    return false;
  }

  return true;
}

const validarEmail = () => {
  const email = document.getElementById("email").value;
  if (validarFormatoEmail(email)){
    renderizarAlertaFormulario("No es una direccion de email correcta");
    return false;
  }

  if(validarCaracteresMaximos(email)) {
    renderizarAlertaFormulario(`El email no debe exceder los ${MAX_CHAR} caracteres. (actualmente ${email.length})`);
    return false;
  }

  return true;
}

const validarNombreLugar = () => {
  const lugar = document.getElementById("lugar").value;
  if(validarCaracteresMinimos(lugar)) {
    renderizarAlertaFormulario("Debe escribir el país");
    return false;
  }

  if(validarCaracteresMaximos(lugar)) {
    renderizarAlertaFormulario(`El pais no debe exceder los ${MAX_CHAR} caracteres. (actualmente ${lugar.length})`);
    return false;
  }

  return true;
}

const validarConsulta = () => {
  const consulta = document.getElementById('consulta').value;
  if(validarCaracteresMinimos(consulta)) {
    renderizarAlertaFormulario("Por favor, escriba su consulta");
    return false;
  }

  if(validarCaracteresMaximos(consulta, MAX_CHAR * 4)) {
    renderizarAlertaFormulario(`La consulta no debe exceder los ${MAX_CHAR * 4} caracteres. (actualmente ${consulta.length})`);
    return false;
  }

  return true;
}

const validarPasajeros = () => {
  const pasajeros = document.querySelectorAll(".opciones");
  for(const pasajero of pasajeros) {
    const val = parseInt(pasajero.value);

    if (val > 10) {
      renderizarAlertaFormulario(`Por favor, seleccione la cantidad de adultos que viajan. (max: 10)`);
      return false;
    }

    if (pasajero.name === "adultos" && val <= 0) {
      renderizarAlertaFormulario(`Por favor, seleccione la cantidad de adultos que viajan. (min: 1, max: 10)`);
      return false;
    }
  }

  return true;
}

const validarCategoria = () => {
  const categoria = document.getElementById("categoria").selectedIndex;
  if(validarCaracteresMinimos(categoria)) {
    renderizarAlertaFormulario("Por favor, seleccione qué categoría de hotel desea");
    return false;
  }

  return true;
}

const validarPaqueteViaje = () => {
  const paquete = document.getElementById("paquete").selectedIndex;
  if(validarCaracteresMinimos(paquete)) {
    renderizarAlertaFormulario("Por favor, seleccione qué tipo de paquete desea");
    return false;
  }

  return true;
}

const validarComidas = () => {
  const comidas = document.getElementById("comidas").value;
  if(validarCaracteresMaximos(comidas, MAX_CHAR * 2)) {
    renderizarAlertaFormulario(`La descripción de las comidas no debe exceder los ${MAX_CHAR * 2} caracteres. (actualmente ${comidas.length})`);
    return false;
  }

  return true;
}

const validarPresupuesto = () => {
  const presupuesto = document.getElementById("presupuesto").value;
  if(presupuesto < MONTO_MIN) {
    renderizarAlertaFormulario(`El monto del presupuesto no debe ser inferior a $${MONTO_MIN},00`);
    return false;
  }

  if(presupuesto > MONTO_MAX) {
    renderizarAlertaFormulario(`El monto del presupuesto no debe exceder los $${MONTO_MAX},00`);
    return false;
  }

  return true;
}

function validacionContacto() {
  return (
    validarNombre()
    && validarApellido()
    && validarEmail()
    && validarNombreLugar()
    && validarConsulta()
  );
}

function validacionViaje() {
  return (
    validarNombre()
    && validarEmail()
    && validarPasajeros()
    && validarNombreLugar()
    && validarCategoria()
    && validarPaqueteViaje()
    && validarComidas()
    && validarPresupuesto()
  );
}

export { validacionViaje, validacionContacto };
