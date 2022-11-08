
function inicializarModal() {
  const modal = document.querySelector(".modal-container");
  modal.addEventListener("click", () => {
    modal.style.display = "none";
  })
}

function modalHandler(event) {
  const modal = document.querySelector(".modal-container");
  const modalImage = document.querySelector(".modal-image");

  modalImage.src = event.srcElement.currentSrc;
  modal.style.display = "flex";
}

export { inicializarModal, modalHandler };
