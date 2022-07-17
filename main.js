const toggleNav = document.querySelector('.toggle-nav');
let navOpen = false;
toggleNav.addEventListener('click', () => {
    if(!navOpen) {
        toggleNav.classList.add('open');
        navOpen = true;
    } else {
        toggleNav.classList.remove('open');
        navOpen = false;
    }
});

const secondaryNav = document.querySelector('.mega-menu');
let secondaryOpen = false;
secondaryNav.addEventListener('click',() => {
    if(!secondaryOpen) {
        secondaryNav.classList.add('open');
        secondaryOpen = true;
    } else {
        secondaryNav.classList.remove('open');
        secondaryOpen = false;
    }
});