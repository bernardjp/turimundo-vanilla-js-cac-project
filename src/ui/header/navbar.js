
function inicializarNavbar() {
  const botonesNavbar = document.querySelectorAll("a");
  const { pathname } = location;

  botonesNavbar.forEach(btn => {
    if(btn.pathname === "/") return;
    if(btn.pathname === pathname) btn.classList.add("on-page");
  })
}

export { inicializarNavbar };
