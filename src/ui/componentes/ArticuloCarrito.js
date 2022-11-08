class ArticuloCarrito {
  constructor(articuloData, callbackHandler) {
    this.callbackHandler = callbackHandler;
    this.cantidad = articuloData.cantidad;
    this.destino = articuloData.destino;
    this.duracion = articuloData.duracion;
    this.fecha = articuloData.fecha;
    this.id = articuloData.id;
    this.imageURL = articuloData.imagenes[0];
    this.nombre = articuloData.nombre;
    this.precio = articuloData.precio;
    this.servicios = articuloData.servicios;
  }

  crearElemento() {
    const articuloContenedor = document.createElement("div");
    articuloContenedor.className = "cart-item-container";
    articuloContenedor.dataset.id = this.id;

    const listadoServicios = this.servicios.map(servicio => `<li>${servicio}.</li>`).join("");

    articuloContenedor.innerHTML = `
      <div class="img-container">
        <img class="card-img" src=${this.imageURL} alt="${this.destino.pais} item image">
      </div>
      <div class="item-info-container">
        <div class="item-title">
          <h3>${this.destino.pais} - ${this.fecha.conFormato}</h3>
        </div>
        <div class="item-info">
          ${this.cantidad} ${this.cantidad > 1 ? 'pasajes' : 'pasaje'} ${this.precio} US$ + impuestos c/u
        </div>
        <div class="item-info">
          ${this.destino.ciudad} | ${this.destino.pais} | ${this.destino.continente}
        </div>
        <div class="item-info">
          ${this.duracion.dias} días | ${this.duracion.noches} noches
        </div>
        <hr class="article-separator">
        <p>Incluye:</p>
        <ul class="item-info-list">
          ${listadoServicios}
        </ul>
        <div class="cart-btn-container">
          <a class="cart-item-btn"  href="promociones.html?id=${this.id}" target="_blank">DETALLES</a>
          <button data-id=${this.id} class="cart-item-btn cart-delete-btn">ELIMINAR</button>
        </div>
      </div>
    `;

    this.#agregarCallbackHandler(articuloContenedor);

    return articuloContenedor;
  }

  #agregarCallbackHandler(elementoContenedor) {
    const botones = elementoContenedor.getElementsByClassName("cart-delete-btn");
    
    for(const btn of botones) {
      btn.addEventListener("click", (e) => this.callbackHandler(e));
    }
  }
}

export { ArticuloCarrito };
