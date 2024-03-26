function toggleMenu() {
    const navbarMenu = document.querySelector('.navbar-menu');
    navbarMenu.classList.toggle('mobile');

    const toggleIcon = document.querySelector('.menu-toggle span');

    if (navbarMenu.classList.contains('mobile')) {
        toggleIcon.innerHTML = '✕';
    } else {
        toggleIcon.innerHTML = '&#9776;';
    }
}