const LS_KEY = "carrito";

function agregarALocalStorage(itemNuevo) {
  const itemsEnLS = obtenerItemsLocalStorage();

  if (itemsEnLS === null) {
    agregarItemLocalStorage([itemNuevo]);
  } else {
    const itemsActualizados = agregarArticuloAListado(itemNuevo, itemsEnLS);
    agregarItemLocalStorage(itemsActualizados);
  }
}

function eliminarItemLocalStorage(id) {
  const itemsEnLS = obtenerItemsLocalStorage();
  if (itemsEnLS === null) return;  

  const itemsFiltrados = itemsEnLS.filter(item => item.id !== id);

  if (itemsFiltrados.length > 0) {
    agregarItemLocalStorage(itemsFiltrados);
  } else {
    localStorage.clear();
  }
}

function obtenerItemsLocalStorage() {
  return JSON.parse(localStorage.getItem(LS_KEY));
}

function agregarItemLocalStorage(item) {
  localStorage.setItem(LS_KEY, JSON.stringify(item));
}

function agregarArticuloAListado(itemNuevo, listadoItems) {
  let esArticuloNuevo = true;

  let listadoActualizado = listadoItems.map(item => {
    if(item.id === itemNuevo.id) {
      item.cantidad = item.cantidad + itemNuevo.cantidad;
      esArticuloNuevo = false;
    }
    return item;
  });

  if(esArticuloNuevo) {
    listadoActualizado.push(itemNuevo);
  }

  return listadoActualizado;
}

export { 
  agregarALocalStorage,
  obtenerItemsLocalStorage,
  eliminarItemLocalStorage
};
