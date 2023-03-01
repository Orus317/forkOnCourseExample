const menuEmail = document.getElementsByClassName("navbar-email")[0];
const desktopMenu = document.getElementsByClassName("desktop-menu")[0];
menuEmail.addEventListener('click', toggleDesktopMenu);
function toggleDesktopMenu() {
    desktopMenu.classList.toggle('inactive');
}