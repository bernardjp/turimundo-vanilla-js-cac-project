class PaqueteDetalle {
  constructor(paqueteData, callbackHandler, modalHandler) {
    this.id = paqueteData.id;
    this.nombre = paqueteData.nombre;
    this.servicios = paqueteData.servicios;
    this.descripcion = paqueteData.descripcion;
    this.destino = paqueteData.destino;
    this.precio = paqueteData.precio;
    this.ubicacion = paqueteData.ubicacion;
    this.duracion = paqueteData.duracion;
    this.fecha = paqueteData.fecha;
    this.review = paqueteData.review;
    this.imagenes = paqueteData.imagenes;
    this.callbackHandler = callbackHandler;
    this.modalHandler = modalHandler;
  }

  crearElemento() {
    const detallesContenedor = document.createElement('article');
    detallesContenedor.id = "pack-details-container";
    detallesContenedor.dataset.id = this.id;

    const banner = this.#crearBanner();
    const informacion = this.#crearSeccionInformacion();
    const navegacion = this.#crearNavegacion();

    detallesContenedor.appendChild(banner);
    detallesContenedor.appendChild(informacion);
    detallesContenedor.appendChild(navegacion);

    this.#agregarCallbackHandler(detallesContenedor);
    this.#agregarImagenPlaceholder(detallesContenedor);
    this.#agregarModalHandler(detallesContenedor);

    return detallesContenedor;
  }

  #crearBanner() {
    const bannerContenedor = document.createElement("figure");
    bannerContenedor.classList.add("pack-banner-container");

    bannerContenedor.innerHTML = `
      <div class="pack-banner-content">
        <div class="pack-banner-overlay">
          <p>${this.fecha.conFormato}</p>
          <h3>Viajá a ${this.destino.ciudad}</h3>
          <p>Una experiencia imperdible de ${this.duracion.dias} días y ${this.duracion.noches} noches</p>
        </div>
        <img class="pack-banner-image" src="${this.imagenes[0]}" alt="Banner de ${this.destino.ciudad}">    
      </div>
    `;

    return bannerContenedor;
  }

  #crearSeccionInformacion() {
    const seccionesContenedor = document.createElement('div');
    seccionesContenedor.className = "pack-info-container";

    const secciones = [
      this.#crearDescripcion(),
      this.#crearListadoImagenes(),
      this.#crearItinerario(),
      this.#crearTablaPrecio(),
      this.#crearDisclaimer()
    ];

    secciones.forEach(seccion => {
      const separador = document.createElement("hr");
      separador.className = "article-separator";

      seccionesContenedor.appendChild(seccion);
      seccionesContenedor.appendChild(separador);
    })

    return seccionesContenedor;
  }

  #crearDescripcion() {
    const descripcionContenedor = document.createElement("div");
    descripcionContenedor.className = "pack-details-wrapper";

    const titulo = "DESCRIPCIÓN";

    const listadoServicios = this.servicios.map(servicio => `<li>${servicio}.</li>`).join("");
    const formularioCompra = this.#crearFormularioCompra();
    const frameGeolocalizacion = this.#crearFrameGeolocalizacion();

    descripcionContenedor.innerHTML = `
      <details class="pack-details" open>
        <summary class="pack-details-summary">${titulo}</summary>
        <div class="pack-details-content pack-description">
          <div class="pack-description-text">
            <div>
              <p>
                <strong>Fecha de salida:</strong>
                <span>${this.fecha.sinFormato}</span>
              </p>
              <p>
                <strong>Duración:</strong>
                <span>${this.duracion.dias} Días | ${this.duracion.noches} Noches | ${this.duracion.total} días en total (incluyendo viaje)</span>
              </p>
              <p>
                <strong>Servicios incluidos:</strong>
                <ul>
                  ${listadoServicios}
                </ul>
              </p>
              <p>
                <strong>Reseñas:</strong>
                <span>
                ${
                  this.review.promedio > 4 
                  ? '<i class="fa-solid fa-star"></i>'
                  : '<i class="fa-solid fa-star-half-stroke"></i>'
                }${this.review.promedio} / 5.00 | ${this.review.cantidad} reseñas</span>
              </p>
              <p class="small-note">*Este paquete se encontrará a la venta una semana antes de la fecha de partida.</p>
            </div>
            ${formularioCompra.outerHTML}
          </div>
          ${frameGeolocalizacion.outerHTML}
        </div>
      </details>
    `;

    return descripcionContenedor;
  }

  #crearFormularioCompra() {
    const formularioCompra = document.createElement("form");
    formularioCompra.action = "post";
    formularioCompra.className = "pack-details-form";

    const agregarCarritoInput = document.createElement("input");
    agregarCarritoInput.id = "btn-agregar-carrito";
    agregarCarritoInput.classList.add("pack-btn", "primary", "cart-btn");
    agregarCarritoInput.type = "submit";
    agregarCarritoInput.value = "Agregar al Carrito";

    formularioCompra.innerHTML = `
      <div>
        <label for="cantidad-pasajes">
          <strong>Cantidad de paquetes:</strong>     
        </label>
        <input type="number" name="cantidad-pasajes" id="cantidad-pasajes" min="1" max="10" placeholder="0" value="1">
      </div>
    `;
    
    formularioCompra.appendChild(agregarCarritoInput);

    return formularioCompra;
  }

  #crearFrameGeolocalizacion() {
    const frameContenedor = document.createElement("div");
    frameContenedor.className = "pack-geolocation-wrapper";

    frameContenedor.innerHTML = `
      <iframe
        style="border-radius: 8px; height: 100%; width: 100%; min-height: 360px;"
        src='https://maps.google.com/maps?q=${this.destino.ciudad},${this.destino.pais}&amp;z=12&amp;ie=UTF8&amp;output=embed'
        allowfullscreen
        loading="lazy"
        scrolling="no"
        frameborder="0"
      ></iframe>
    `;

    return frameContenedor;
  }

  #crearListadoImagenes() {
    const listadoImagenesContenedor = document.createElement("div");
    listadoImagenesContenedor.className = "pack-details-wrapper";

    const titulo = "IMÁGENES";

    const listadoImagenes = this.imagenes.map((imagen, i) => {
        return `
          <div class="image-container">
            <img
              class="pack-image"
              width="100%"
              height="100%"
              src=${imagen}
              alt="imagen-${this.destino.ciudad}-${i + 1}">
          </div>
        `;
      })
      .join("");

    listadoImagenesContenedor.innerHTML = `
      <div class="pack-details-wrapper">
        <details class="pack-details" open>
          <summary class="pack-details-summary">${titulo}</summary>
          <div class="pack-details-content pack-images-container">
            ${listadoImagenes}
          </div>
        </details>
      </div>
    `;

    return listadoImagenesContenedor;
  }

  #crearItinerario() {
    const itinerarioContenedor = document.createElement("div");
    itinerarioContenedor.className = "pack-details-wrapper";

    const titulo = "ITINERARIO COMPLETO";

    const listadoItinerario = this.descripcion.map(([jornada, detalle]) => {
        return `
          <p>
            <strong>${jornada}</strong>
            <span>${detalle}</span>
          </p>
        `;
      })
      .join("");

    itinerarioContenedor.innerHTML = `
      <details class="pack-details" open>
        <summary class="pack-details-summary">${titulo}</summary>
        <div class="pack-details-content">
          ${listadoItinerario}
        </div>
      </details>
    `;

    return itinerarioContenedor;
  }

  #crearTablaPrecio() {
    const tablaPreciosContenedor = document.createElement("div");
    tablaPreciosContenedor.className = "pack-details-wrapper";

    const titulo = "PRECIOS POR PERSONA";
    const formatearMoneda = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });

    const precio = formatearMoneda.format(this.precio);
    const descuentoPasajeroFrecuente = formatearMoneda.format(500);
    const precioGastosTasas = formatearMoneda.format(Math.ceil(this.precio * 0.25));

    tablaPreciosContenedor.innerHTML = `
      <details class="pack-details" open>
        <summary class="pack-details-summary">${titulo}</summary>
        <div class="pack-details-content">
          <table class="pack-price-table">
            <tbody>
              <tr class="price-table-row">
                <td>Precio</td>
                <td>${precio} + IVA</td>
              </tr>
              <tr class="price-table-row">
                <td>Descuento "Pasajeros Frecuentes"</td>
                <td>${descuentoPasajeroFrecuente}</td>
              </tr>
              <tr class="price-table-row">
                <td>DNT, Tasas(1) y Gastos Administrativos</td>
                <td>${precioGastosTasas}</td>
              </tr>
            </tbody>
          </table>
          <span class="small-note">(1) Impuestos sujetos a modificaciones de las compañías aéreas</span>
        </div>
      </details>
    `;

    return tablaPreciosContenedor;
  }

  #crearDisclaimer() {
    const disclaimerContenedor = document.createElement("div");
    disclaimerContenedor.classList.add(["pack-details-wrapper", "small-note"]);

    const titulo = "DETALLES DE TARIFAS";

    disclaimerContenedor.innerHTML = `
      <details class="pack-details">
        <summary class="pack-details-summary">${titulo}</summary>
        <div class="pack-details-content">
          <p>
            <strong>*Precios sujetos a la aplicación del impuesto PAÍS del 30% según Ley de Solidaridad Social 27.541 Res. 4659/2020 y a la Percepción del 35% de AFIP Res. 4815. En caso de realizar el pago en DÓLARES estos dos impuestos no deberán abonarse.</strong>
          </p>
          <p>
            <strong>*A los servicios al exterior que se abonen en efectivo en la agencia de viajes o mediante depósito bancario se les aplicará una Percepción del 5% conforme a la Resolución de AFIP Nro. 3825.</strong>
          </p>
          <p>
            <strong>*Las tarifas expresadas podrán ser canceladas en pesos argentinos al tipo de cambio oficial del día del pago.</strong>
          </p>
          <p>
            <strong>(*) Descuentos para pasajeros frecuentes:</strong>
            <span>Pasajeros frecuentes son considerados aquellos que hayan realizado un viaje grupal o más con TuriMundo.</span>
          </p>
          <p>
            <strong>Pasajeros del Interior del país:</strong>
            <span>Para pasajeros que residan a más de 300 kilómetros de Buenos Aires, se les ofrecerá sin costo alguno pasajes aéreos de cabotaje ida y vuelta en clase económica (sujetos a disponibilidad y emitidos una vez que el pasajero abone el total del viaje), más una noche pretour en hotel 4 estrellas en Buenos Aires y traslado desde el hotel al aeropuerto de Ezeiza. En caso de no utilizar dichos servicios, no se podrá solicitar ningún tipo de reintegro.</span>
          </p>
          <p>
            <strong>Asistencia al viajero:</strong>
            <span>Para viajar es indispensable contratar un servicio de asistencia al viajero con cobertura internacional y para COVID-19. En caso de necesitar contratar dicho servicio consultarnos los productos disponibles y tarifas.</span>
          </p>
        </div>
      </details>
    `;

    return disclaimerContenedor;
  }

  #crearNavegacion() {
    const navegacionContenedor = document.createElement("div");
    navegacionContenedor.className = "pack-details-navigation";

    navegacionContenedor.innerHTML = `
      <a href="./paquetes.html" class="pack-btn secondary">
        <i class="fa-solid fa-list"></i>
      </a>
      <a href="#header" class="pack-btn secondary">
        <i class="fa-solid fa-arrow-up"></i>
      </a>
    `;

    return navegacionContenedor;
  }

  #agregarImagenPlaceholder(elementoContenedor) {
    const elementosImagen = elementoContenedor.getElementsByTagName("img");

    for(const img of elementosImagen) {
      img.addEventListener("error", () => img.src = "/Multimedia/favicon_globo.png");
    }
  }

  #agregarCallbackHandler(elementoContenedor) {
    const botonesCarrito = elementoContenedor.getElementsByClassName("cart-btn");

    for(const btn of botonesCarrito) {
      btn.addEventListener("click", (e) => this.callbackHandler(e));
    }
  }

  #agregarModalHandler(elementoContenedor) {
    const imagenes = elementoContenedor.getElementsByClassName("image-container");

    for(const img of imagenes) {
      img.addEventListener("click", (e) => this.modalHandler(e));
    }
  }
}

export { PaqueteDetalle };


{/*
iframe de google API con la API key en el src
Usar este iframe una vez que se creen las restricciones desde el Google Cloud Console
(se necesita el nombre del domino para restringir el acceso desde otros sitios)

  <iframe
    width="600"
    height="450"
    style="border:0"
    loading="lazy"
    allowfullscreen
    referrerpolicy="no-referrer-when-downgrade"
    title="Location in Google Maps"
    src="https://www.google.com/maps/embed/v1/place?key=[API_KEY]&q=4°10′30″N,73°30′30″E">
  </iframe>

*/}