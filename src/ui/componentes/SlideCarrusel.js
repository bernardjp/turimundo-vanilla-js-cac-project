
class SlideCarrusel {
  constructor(slideData) {
    this.destino = slideData.destino;
    this.fecha = slideData.fecha;
    this.id = slideData.id;
    this.imageURL = slideData.imagenes;
    this.slogan = slideData.slogan;
  }

  crearElemento() {
    const elementoContenedor = document.createElement("div");
    elementoContenedor.id = `pack-${this.id}`;
    elementoContenedor.className = "slide";
    const fecha = this.fecha.conFormato.split(" ").splice(0, 3).join(" ").toUpperCase();

    elementoContenedor.innerHTML = `
      <div class="slide-overlay">
        <p>${fecha}</p>
        <h3>Viajá a ${this.destino.ciudad}</h3>
        <p>${this.slogan}</p>
        <a href="promociones.html?id=${this.id}" class="slide-btn-details" target="_blank">VER DETALLES</a>
      </div>
      <img class="slide-image" src="assets/images/${this.id}.webp" alt="${this.destino.pais}-picture">  
    `;

    return elementoContenedor;
  }
}

export { SlideCarrusel };
