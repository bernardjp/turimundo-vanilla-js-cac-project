
function inicializarBotonBurgerMenu() {
  cerrarMenu();

  const boton = document.querySelector(".header-burger-btn");
  boton.checked = false;
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
  const header = document.querySelector(".header-root");
  const menu = document.querySelector(".header-navbar");
  const estaActivo = [...menu.classList].includes("active");

  if (estaActivo) {
    menu.classList.remove("active");

    // Change the overflow after the hiding animation ended.
    setTimeout(() => {
      header.style.overflow = "hidden";
    }, 300);

  } else {
    menu.classList.add("active");
    header.style.overflow = "initial";
  }
}

export { inicializarBotonBurgerMenu };
