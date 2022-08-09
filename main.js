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

// rating stars
let rating = document.querySelectorAll(".testimonials .rating");
let ratingStar = document.querySelectorAll(".testimonials .rating i");

let filledStars = [];

// looping over each card rating stars
rating.forEach(element => {
    // looping over each element in one card
    ratingStar.forEach(element => {
        // when clicking the star
        element.onclick = (event) => {
            // console.log(element.nextElementSibling)
            if (!element.classList.contains("filled")) {
                // color the element
                element.classList.add("filled", "fas");
                filledStars.push(element.dataset.id);
                // color the previous elements
                let prevSiblings  = getPreviousSiblings(element);
                prevSiblings.forEach(element => {
                    element.classList.add("filled", "fas");
                    filledStars.push(element.dataset.id);
                });
                // make sure that the next elements is not colored
                let nextSiblings = getNextSiblings(element);
                nextSiblings.forEach(element => {
                    element.classList.remove("filled", "fas");
                    // console.log(element.dataset.id);
                });
            } else if (element.classList.contains("filled") && element.nextElementSibling.classList.contains("filled")) {
                let nextSiblings = getNextSiblings(element);
                nextSiblings.forEach(element => {
                    element.classList.remove("filled", "fas");
                });
            } else {
                // color the element
                element.classList.remove("filled", "fas");
                // color the previous elements
                let prevSiblings  = getPreviousSiblings(element);
                prevSiblings.forEach(element => {
                    element.classList.remove("filled", "fas");
                });
                // make sure that the next elements is not colored
                let nextSiblings = getNextSiblings(element);
                nextSiblings.forEach(element => {
                    element.classList.remove("filled", "fas");
                });
            }
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

function getNextSiblings(element) {
    var siblings  = [];
    while (element = element.nextElementSibling) {
        siblings.push(element);
    }
    return siblings ;
}