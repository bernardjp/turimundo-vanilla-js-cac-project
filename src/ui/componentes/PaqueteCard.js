class PaqueteCard {
  constructor(paqueteData) {
    this.id = paqueteData.id;
    this.nombre = paqueteData.nombre;
    this.imageURL = paqueteData.imagenes[0];
    this.destino = paqueteData.destino;
    this.duracion = paqueteData.duracion;
    this.review = paqueteData.review;
    this.precio = paqueteData.precio;
    this.promocion = paqueteData.promocion;
  }

  crearElemento() {
    const cardContenedor = document.createElement('a');
    cardContenedor.href = `promociones.html?id=${this.id}`;
    cardContenedor.target = "_blank";
    cardContenedor.id = `pack-${this.id}`;
    cardContenedor.className = 'card-container';

    const formatearMoneda = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });
    const [precioEntero, precioDecimal] = formatearMoneda.format(this.precio).split('.');

    cardContenedor.innerHTML = `
      ${Boolean(this.promocion) ? '<div class="card-sale">En oferta!</div>' : ''}
      <div class="card-img-container">
        <img class="card-img" src="${this.imageURL}" alt="imagen de ${this.destino.pais}">
      </div>
      <div class="card-info-container">
        <div>
          <p class="card-title">${this.nombre}</p>
          <p class="card-destination">${this.destino.ciudad} | ${this.destino.pais} | ${this.destino.continente}</p>
          <p class="card-information">${this.duracion.dias} días | ${this.duracion.noches} noches</p>
          <p class="card-information">
            ${
              this.review.promedio > 4 
              ? '<i class="fa-solid fa-star"></i>'
              : '<i class="fa-solid fa-star-half-stroke"></i>'
            }${this.review.promedio} | ${this.review.cantidad} reviews</p>
        </div>
        <div class="card-price-container">
          <p style="font-size: 0.8rem; font-weight: 600;">Precio por persona en USD desde</p>
          <span class="card-price">${precioEntero}</span><span style="font-weight:bold;">.${precioDecimal}</span>
          <p style="font-size: 0.8rem">No incluye impuestos, tasas y cargos</p>
        </div>
      </div>
    `;

    return cardContenedor;
  }
}

export { PaqueteCard };
