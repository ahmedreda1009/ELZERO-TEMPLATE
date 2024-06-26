// nav bar mobile toggle ////////////////////////////////////////////////////////////////////////////////
const toggleNav = document.querySelector(".toggle-nav");
let secondMenu = document.querySelector(".mega-menu");

document.addEventListener('click', (e) => {
  let burgerBtn = e.target.classList.contains(".toggle-nav");
  let burgerBtnIcons = e.target.closest(".toggle-nav");

  if (e.target === secondMenu) {
    secondMenu.classList.toggle("open");
  }
  if (!toggleNav.classList.contains("open")) {
    secondMenu.classList.remove("open");
  }

  if (e.target.closest("nav")) return;

  if (burgerBtn || burgerBtnIcons) {
    toggleNav.classList.toggle("open");
  } else {
    toggleNav.classList.remove("open");
  }
  
})

// rating stars ////////////////////////////////////////////////////////////////////////////////////////
let rating = document.querySelectorAll(".testimonials .rating");
let ratingStar = document.querySelectorAll(".testimonials .rating i");

let filledStars = [];

if (window.localStorage.getItem("stars")) {
  filledStars = window.localStorage.getItem("stars").split(",").sort();
  ratingStar.forEach((element) => {
    filledStars.forEach((ele) => {
      if (element.dataset.id == ele) {
        element.classList.add("filled", "fas");
      }
    });
  });
}

// looping over each card rating stars
rating.forEach((element) => {
  // looping over each element in one card
  ratingStar.forEach((element) => {
    // when clicking the star
    element.onclick = (event) => {
      // console.log(element.nextElementSibling)
      if (!element.classList.contains("filled")) {
        // color the element
        element.classList.add("filled", "fas");
        if (!filledStars.includes(element.dataset.id)) {
          filledStars.push(element.dataset.id);
        }
        addStarsToLocalStorageFrom(filledStars);
        // color the previous elements
        let prevSiblings = getPreviousSiblings(element);
        prevSiblings.forEach((element) => {
          element.classList.add("filled", "fas");
          if (!filledStars.includes(element.dataset.id)) {
            filledStars.push(element.dataset.id);
          }
          addStarsToLocalStorageFrom(filledStars);
        });
        // make sure that the next elements is not colored
        // let nextSiblings = getNextSiblings(element);
        // nextSiblings.forEach(element => {
        //     element.classList.remove("filled", "fas");
        //     // console.log(element.dataset.id);
        // });
      } else if (
        element.classList.contains("filled") &&
        element.nextElementSibling.classList.contains("filled")
      ) {
        let nextSiblings = getNextSiblings(element);
        nextSiblings.forEach((element) => {
          element.classList.remove("filled", "fas");
          filledStars = removeStarFrom(filledStars, element.dataset.id);
          // filledStars = filledStars.filter(ele => ele != element.dataset.id);
          addStarsToLocalStorageFrom(filledStars);
          // console.log(element.dataset.id);
        });
      } else {
        // color the element
        element.classList.remove("filled", "fas");
        filledStars = filledStars.filter((ele) => ele != element.dataset.id);
        addStarsToLocalStorageFrom(filledStars);
        // color the previous elements
        let prevSiblings = getPreviousSiblings(element);
        prevSiblings.forEach((element) => {
          element.classList.remove("filled", "fas");
          filledStars = removeStarFrom(filledStars, element.dataset.id);
          // filledStars = filledStars.filter(ele => ele != element.dataset.id);
          addStarsToLocalStorageFrom(filledStars);
        });
        // make sure that the next elements is not colored
        let nextSiblings = getNextSiblings(element);
        nextSiblings.forEach((element) => {
          element.classList.remove("filled", "fas");
          filledStars = removeStarFrom(filledStars, element.dataset.id);
          // filledStars = filledStars.filter(ele => ele != element.dataset.id);
          addStarsToLocalStorageFrom(filledStars);
        });
      }
    };
  });
});

function getPreviousSiblings(element) {
  var siblings = [];
  while ((element = element.previousElementSibling)) {
    siblings.push(element);
  }
  return siblings;
}

function getNextSiblings(element) {
  var siblings = [];
  while ((element = element.nextElementSibling)) {
    siblings.push(element);
  }
  return siblings;
}

function removeStarFrom(arrayName, starId) {
  arrayName = arrayName.filter((ele) => ele != starId);
  return arrayName;
}

function addStarsToLocalStorageFrom(arrayName) {
  window.localStorage.setItem("stars", arrayName);
}

// scroll with the arrow in the main //////////////////////////////////////////////////////////////////
let arrowMain = document.querySelector("main .arrow i");

arrowMain.addEventListener("click", () => {
  window.scrollTo({
    top: 650,
    behavior: "smooth",
  });
});

// scroll to top button //////////////////////////////////////////////////////////////////
let scrollBtn = document.createElement("div");
scrollBtn.classList.add("fa-solid", "fa-arrow-up-long", "scroll-to-top");
document.body.prepend(scrollBtn);

// scroll to top button (on scroll)////////////////////////////////
window.addEventListener("scroll", () => {
	if (window.scrollY >= 500) {
		scrollBtn.style.display = "block";
	} else {
		scrollBtn.style.display = "none";
	}
})

// scroll to top button (on click)////////////////////////////////
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth"
  });
})


// show progress width on scroll //////////////////////////////
let progSec = document.getElementById("our-skills");
let progBar = document.querySelectorAll(".prog-bar");
let progNum = document.querySelectorAll(".progression .progress-num");

let started = false;

window.addEventListener("scroll", () => {
	if (window.scrollY >= progSec.offsetTop - 50) {
	if (!started) {
		progNum.forEach((element) => {
		let intId = setInterval(() => {
			element.textContent++;
			progBar.forEach((ele, index) => {
			ele.style.width = `${progNum[index].textContent}%`;
			});
			if (element.textContent === element.dataset.prog) {
			clearInterval(intId);
			}
		}, 20);
		});
	}
	started = true;
}})


// event count down //////////////////////////////

let days = document.querySelector(".latest-events .counter-unit:first-child .number");
let hours = document.querySelector(".latest-events .counter-unit:nth-child(2) .number");
let minutes = document.querySelector(".latest-events .counter-unit:nth-child(3) .number");
let seconds = document.querySelector(".latest-events .counter-unit:last-child .number");

let counter = setInterval(() => {
  let timeNow = new Date();
  let eventDate = new Date("2023-01-01T00:00:00");

  let totalMilli = eventDate - timeNow;

  if (totalMilli <= 0) {
    clearInterval(counter);
    return;
  }

  // total remaining time in [seconds, minutes, hours, days]
  let totalRemainingSec = Math.floor(totalMilli / 1000);
  let totalRemainingMin = Math.floor(totalRemainingSec / 60);
  let totalRemainingHours = Math.floor(totalRemainingMin / 60);
  let totalRemainingDays = Math.floor(totalRemainingHours / 24);

  // remaing hours after removing the days
  let remHours = totalRemainingHours - (totalRemainingDays * 24);
  // remaing minutes after removing the hours
  let remMinutes = totalRemainingMin - (totalRemainingHours * 60);
  // remaing seconds after removing the minutes
  let remSeconds = totalRemainingSec - (totalRemainingMin * 60);

  days.textContent = totalRemainingDays;
  hours.textContent = remHours;
  minutes.textContent = remMinutes;
  seconds.textContent = remSeconds;

  if (days.textContent < 10) {
    days.textContent = `0${totalRemainingDays}`;
  }
  if (hours.textContent < 10) {
    hours.textContent = `0${remHours}`;
  }
  if (minutes.textContent < 10) {
    minutes.textContent = `0${remMinutes}`;
  }
  if (seconds.textContent < 10) {
    seconds.textContent = `0${remSeconds}`;
  }
}, 1000);

/*------------------------------------------------------------------------------*/
/*-------------------------------- top videos close and open ---------------------------*/
/*------------------------------------------------------------------------------*/
let videoArrow = document.querySelector(".top-videos .video-titles i.fa-chevron-down");
let videoTitles = document.querySelector(".top-videos .video-titles ul");

videoArrow.addEventListener('click', () => {
  videoArrow.classList.toggle("close");
  videoTitles.classList.toggle("close");
})

window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 1000) {
    videoArrow.classList.add("close");
    videoTitles.classList.add("close");
  }
})

window.onresize = function() {
  if (window.innerWidth <= 1000) {
    videoArrow.classList.add("close");
    videoTitles.classList.add("close");
  } else {
    videoArrow.classList.remove("close");
    videoTitles.classList.remove("close");
  }
}

/*------------------------------------------------------------------------------*/
/*-------------------------------- top videos choose video ---------------------------*/
/*------------------------------------------------------------------------------*/
let videoWindow = document.querySelector(".top-videos .video-window img");
let videoTitle = document.querySelectorAll(".top-videos .video-titles ul li");
let shuffleBtn = document.querySelector(".top-videos .video-titles i.fa-random");
let videoPlayTitle = document.querySelector(".top-videos .video-window .video-title");

videoTitle.forEach(ele => {
  ele.addEventListener('click', () => {
    videoWindow.src = ele.dataset.link;

    videoTitle.forEach(e => {
      e.classList.remove("active");
    })
    ele.classList.add("active");

    videoPlayTitle.textContent = ele.firstElementChild.textContent;
  })
});

let lastRandom;

shuffleBtn.addEventListener('click', () => {
  let random = Math.floor(Math.random() * 7);
  if (random === lastRandom) {
    random++;
  }
  lastRandom = random;
  videoWindow.src = videoTitle[random].dataset.link;

  videoTitle.forEach(e => {
    e.classList.remove("active");
  })
  videoTitle[random].classList.add("active");

  videoPlayTitle.textContent = videoTitle[random].firstElementChild.textContent;
});

/*------------------------------------------------------------------------------*/
/*-------------------------------- Our Awesome Stats number increasing ---------------------------*/
/*------------------------------------------------------------------------------*/
let awesomeSection = document.querySelector(".our-awesome-stats");
let awesomeNumber = document.querySelectorAll(".our-awesome-stats .card .number");

window.addEventListener('scroll', () => {
if (window.scrollY >= awesomeSection.offsetTop - 200) {
    awesomeNumber.forEach(element => {
      setInterval(() => {
        if (element.textContent < +element.dataset.number) {
          element.textContent++;
        }
      }, 20);
    });
  }
})

/*------------------------------------------------------------------------------*/
/*-------------------------------- Our Awesome Stats number increasing ---------------------------*/
/*------------------------------------------------------------------------------*/
let footerDate = document.querySelector(".copy-rights span");
let thisYear = new Date();

footerDate.textContent = thisYear.getFullYear();
