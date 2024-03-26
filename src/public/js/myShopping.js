document.addEventListener("DOMContentLoaded", function () {
    const toggleButtons = document.querySelectorAll(".toggle-button");
    toggleButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productsList = this.nextElementSibling;
            productsList.classList.toggle("visible");
        });
    });
});