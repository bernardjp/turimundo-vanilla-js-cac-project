
const TASA_IMPUESTOS = 0.25; 

function calcularCosto(articulos) {
  return articulos.reduce((acumulado, articulo) =>{
    const precio = parseInt(articulo.precio);
    const cantidad = parseInt(articulo.cantidad);
    const descuentoUnidad = parseInt(articulo.descuento);

    const descuento = descuentoUnidad * cantidad;
    const costo = precio * cantidad;
    const impuestos = costo * TASA_IMPUESTOS;

    return {
      costo: acumulado.costo + costo,
      descuento: acumulado.descuento + descuento,
      impuestos: acumulado.impuestos + impuestos
    };
  }, { costo: 0, descuento: 0, impuestos: 0 });
}

export { calcularCosto };
