import { renderizarListadoPaquetes } from "../ui/listadoPaquetes.js";

function inicializarFiltroPequetes(data) {
  const filtro = document.getElementById("filtro");
  filtro.reset();
  filtro.addEventListener("change", (e) => filtroHandler(e, data));
}

function filtroHandler(e, data) {
  let { paquetes } = data;
  const parametros = new FormData(e.target.form);

  const paquetesFiltrados = paquetes.filter(paquete => filtrarPaquetes(paquete, parametros));
  const paquetesOrdenados = ordenarPaquetesPorPrecio(paquetesFiltrados, parametros.get("orden-precio"));

  renderizarListadoPaquetes({ paquetes: paquetesOrdenados });
}

function ordenarPaquetesPorPrecio(paquetes, parametro) {
  if (!parametro) return paquetes;

  const orden = {
    ascendente: (a, b) => parseFloat(a.precio) > parseFloat(b.precio),
    descendente: (a, b) => parseFloat(a.precio) < parseFloat(b.precio)
  };
  const ordenarPrecioCB = orden[parametro];
  
  return [...paquetes].sort(ordenarPrecioCB);
}

function filtrarPaquetes(item, formData) {
  return (
    validarIgualValor(item.destino.continente, formData.get("continente"))
    && validarMenorValor(item.duracion.total, formData.get("duracion"))
    && validarMayorValor(item.review.promedio, formData.get("review"))
    && validarMenorValor(item.precio, formData.get("precio"))
    && validarIgualValor(item.promocion, formData.get("promocion"))
  );
}

function validarCampoVacio(valor) {
  return (valor === null || valor === "");
}

function validarMenorValor(itemValor, formValue) {
  return validarCampoVacio(formValue) || (Number(itemValor) <= Number(formValue));
}

function validarMayorValor(itemValor, formValue) {
  return validarCampoVacio(formValue) || (Number(itemValor) >= Number(formValue));
}

function validarIgualValor(itemValor, formValue) {
  return validarCampoVacio(formValue) || (itemValor === formValue);
}

export { inicializarFiltroPequetes };
