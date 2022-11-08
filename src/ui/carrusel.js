import { SlideCarrusel } from "./componentes/SlideCarrusel.js";
import { obtenerDataDeJSON } from "../storage/jsonDataFetching.js";
import { filtrarItems } from "../utils/filtros-mappers.js";

async function inicializarCarrusel() {
  const { paquetes } = await obtenerDataDeJSON();
  const paquetesPromocionados = filtrarItems(paquetes, "promocion", "true");

  if (paquetesPromocionados.length === 0) {
    renderizarSlideDefault();
  } else {
    renderizarCarrusel(paquetesPromocionados);
    agregarComportamientoCarrusel();
  }
}

function renderizarSlideDefault() {
  const sliderContainer = document.getElementById("slider-container");
  const sliderNavigation = document.querySelectorAll(".slide-btn");

  sliderNavigation.forEach(btn => btn.style.display = "none");
  sliderContainer.style.width = "100%";
  sliderContainer.style.margin = "auto";
}

function renderizarCarrusel(listadoPaquetes) {
  const sliderContainer = document.getElementById("slider-container");
  const defaultSlides = sliderContainer.childElementCount;
  sliderContainer.style.width = `${(listadoPaquetes.length + defaultSlides) * 100}%`;
  
  listadoPaquetes.forEach(paquete => renderizarSlideCarrusel(paquete));
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

  function reiniciarTimer() {
    clearInterval(transitionInterval);
    transitionInterval = setInterval(nextSlide, AUTO_TRANSITION);
  }

  sliderBtnRight.addEventListener('click', () => {
    nextSlide();
    reiniciarTimer();
  });

  sliderBtnLeft.addEventListener('click', () => { 
    prevSlide();
    reiniciarTimer();
  });
}

export { inicializarCarrusel };
