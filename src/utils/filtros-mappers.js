
function filtrarItems(listado, param, valor) {
  const itemsFiltrados = listado.filter(item => item[param] === valor);

  return itemsFiltrados;
}

function mapearArticulosConCosto(dataArticulos) {
  return dataArticulos.map(({ nombre, precio, cantidad }) => ({ nombre, precio, cantidad }));
}

function mapearArticulosConCantidad(listadoArticulos, dataArticulos) {
  return listadoArticulos.map(articulo => {
    const [articuloFiltrado] = dataArticulos.filter(data => data.id === articulo.id);

    return { ...articuloFiltrado, cantidad: articulo.cantidad };
  });
}

export { filtrarItems, mapearArticulosConCantidad, mapearArticulosConCosto };
