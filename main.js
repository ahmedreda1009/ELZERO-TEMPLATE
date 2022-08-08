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

let rating = document.querySelectorAll(".testimonials .rating");
let ratingStar = document.querySelectorAll(".testimonials .rating i");
rating.forEach(element => {
    ratingStar.forEach(element => {
        element.setAttribute("data-id",  performance.now().toString(36)+Math.random().toString(36).replace(/\./g,""));
        element.onclick = (event) => {
            element.classList.add("filled", "fas");
            let siblings  = getPreviousSiblings(element);
            siblings .forEach(element => {
                element.classList.add("filled", "fas");
            });
        }
    });
});

function getPreviousSiblings(element) {
    var siblings  = [];
    while (element = element.previousElementSibling) {
        siblings.push(element);
    }
    return siblings ;
}