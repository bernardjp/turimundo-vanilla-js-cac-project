import { obtenerDataDeJSON } from "./storage/jsonDataFetching.js";
import { inicializarHeader } from "./ui/header/header.js";
import { inicializarListadoPaquetes } from "./ui/listadoPaquetes.js";
import { inicializarFiltroPequetes } from "./ui/filtroPaquetes.js";

async function inicializar() {
  const data = await obtenerDataDeJSON();

  inicializarHeader();
  inicializarListadoPaquetes(data);
  inicializarFiltroPequetes(data);
}

inicializar();
