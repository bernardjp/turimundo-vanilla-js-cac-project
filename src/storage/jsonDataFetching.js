
async function obtenerDataDeJSON() {
  try {
    let response = await fetch("Data/paquetes.json");
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Error al leer archivo JSON", error);
  }
}

export { obtenerDataDeJSON };
