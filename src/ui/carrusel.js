import { SlideCarrusel } from "./componentes/SlideCarrusel.js";
import { obtenerDataDeJSON } from "../storage/jsonDataFetching.js";
import { filtrarItems } from "../utils/filtros-mappers.js";

async function inicializarCarrusel() {
  const data = await obtenerDataDeJSON();

  renderizarCarrusel(data);
  agregarComportamientoCarrusel();
}

function renderizarCarrusel(listadoPaquetes) {
  let { paquetes } = listadoPaquetes;
  const paquetesPromocionados = filtrarItems(paquetes, "promocion", "1");

  if (paquetesPromocionados.length === 0) {
    // mostrar mensaje de error al cargar promociones.
    // renderizarMensaje("NO SE HAN ENCONTRADO PAQUETES");
  } else {
    const sliderContainer = document.getElementById("slider-container");
    const defaultSlides = sliderContainer.childElementCount;
    sliderContainer.style.width = `${(paquetesPromocionados.length + defaultSlides) * 100}%`;

    paquetesPromocionados.forEach(paquete => renderizarSlideCarrusel(paquete));
  }
}

function renderizarSlideCarrusel(paqueteData) {
  const sliderContainer = document.querySelector('#slider-container');
  
  const mappedSlide = new SlideCarrusel(paqueteData);
  const slideElemento = mappedSlide.crearElemento();

  sliderContainer.appendChild(slideElemento);
}

function agregarComportamientoCarrusel() {
  const AUTO_TRANSITION = 5000;
  const TRANSITION = 500;
  
  const sliderBtnRight = document.querySelector('#btn-right');
  const sliderBtnLeft = document.querySelector('#btn-left');
  const sliderContainer = document.querySelector('.slider-container');
  sliderContainer.insertAdjacentElement('afterbegin', sliderContainer.lastElementChild);

  let transitionInterval = setInterval(nextSlide, AUTO_TRANSITION);

  function nextSlide(){
    const firstSlide = sliderContainer.firstElementChild;
    sliderContainer.style.marginLeft = '-200%';
    sliderContainer.style.transition = `all ${TRANSITION}ms`;

    setTimeout(function() {
      sliderContainer.style.transition = 'none';
      sliderContainer.insertAdjacentElement('beforeend', firstSlide);
      sliderContainer.style.marginLeft = '-100%';
    }, TRANSITION);
  }

  function prevSlide(){
    let lastSlide = sliderContainer.lastElementChild;
    sliderContainer.style.marginLeft = '0%';
    sliderContainer.style.transition = `all ${TRANSITION}ms`;

    setTimeout(function() {
      sliderContainer.style.transition = 'none';
      sliderContainer.insertAdjacentElement('afterbegin', lastSlide);
      sliderContainer.style.marginLeft = '-100%';
    }, TRANSITION);
  }

  sliderBtnRight.addEventListener('click', () => {
    nextSlide();

    // Reinicia el timer de transicion de las slides
    clearInterval(transitionInterval);
    transitionInterval = setInterval(nextSlide, AUTO_TRANSITION);
  });

  sliderBtnLeft.addEventListener('click', () => { 
    prevSlide();

    // Reinicia el timer de transicion de las slides
    clearInterval(transitionInterval);
    transitionInterval = setInterval(nextSlide, AUTO_TRANSITION);
  });

}

export { inicializarCarrusel };
