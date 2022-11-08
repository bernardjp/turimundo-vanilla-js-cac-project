
function inicializarBotonBurgerMenu() {
  cerrarMenu();

  const boton = document.querySelector(".header-burger-btn");
  boton.addEventListener("click", onClickHandler);
}

function cerrarMenu() {
  const menu = document.querySelector(".header-navbar");
  const estaActivo = [...menu.classList].includes("active");
  
  if (estaActivo) {
    menu.classList.remove("active");
  }
}

function onClickHandler() {
  const menu = document.querySelector(".header-navbar");
  const estaActivo = [...menu.classList].includes("active");
  
  if (estaActivo) {
    menu.classList.remove("active");
  } else {
    menu.classList.add("active");
  }
}

export { inicializarBotonBurgerMenu };
