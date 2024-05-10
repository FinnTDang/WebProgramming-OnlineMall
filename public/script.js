const menubar = document.getElementById('menubar');
const nav = document.querySelector('.navbar-nav');
const close = document.getElementById('sidenav-close');

if (menubar) {
    menubar.addEventListener('click', () => {
        nav.classList.add('show');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('show');
    })
}