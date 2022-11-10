const [bttTheme, bttOpenModal] = [document.querySelector(".btt-active-theme"), document.querySelector(".btt-abrir-modal")]

bttOpenModal.addEventListener("click", () => {
    let openContainer = document.querySelector(".conteudo-principal");
    openContainer.classList.toggle("open-container");
})

bttTheme.addEventListener("click", () => {
    let moverBtt = document.querySelector("body");
    moverBtt.classList.toggle("dark");
});
