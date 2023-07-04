// navbar scrolling function
// window.addEventListener("scroll", function () {
//   var nav = document.querySelector("nav");
//   var myimg = document.getElementById("logoimg")
//   nav.classList.toggle("sticky", window.scrollY > 200)

//   if(window.scrollY > 200){
//     myimg.src = "./images/mocartlogoblack.png";

//   }else{
//     myimg.src = "./images/mocartlogo.png";

//   }

// })

window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");
  var myimg = document.getElementById("logoimg");
  var x = document.getElementById("resnav");

  console.log(x.style.display == "none");
  if (x.style.display == "none") {
    nav.classList.toggle("sticky", window.scrollY > 200);
  }
  if (window.scrollY > 200) {
    myimg.src = "./images/mocartlogoblack.png";
  } else if (window.scrollY < 200) {
    if (x.style.display == "none") {
      myimg.src = "./images/mocartlogo.png";
    }
  }
});

let isFunctionExecuted = false;
const counter = document.getElementById("counter");
window.addEventListener("scroll", function () {
  if (counter) {
    const rect = counter.getBoundingClientRect();
    if (rect.top >= 0 && rect.top <= window.innerHeight) {
      if (!isFunctionExecuted) {
        counting();
        isFunctionExecuted = true;
      }
    } else {
      isFunctionExecuted = false;
    }
  }
});

// counter function
const counting = () => {
  let valueDisplays = document.querySelectorAll(".num");
  let interval = 2000;
  valueDisplays.forEach((val) => {
    let startValue = 0;
    let endValue = parseInt(val.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(() => {
      startValue += 1;
      val.textContent = startValue;
      if (startValue == endValue) {
        clearInterval(counter);
      }
    }, duration);
  });
};

// mission side bar fucntion
//window.addEventListener("scroll", function(event) {preventScroll(event);}, { passive: false });
//window.addEventListener("wheel", function(event) {preventScroll(event);}, { passive: false });

let previousScrollPosition =
  window.scrollY || document.documentElement.scrollTop;
let wheelCounter = 0;
function preventScroll(event) {
  const div = document.querySelector(".ourMission");
  const rect = div.getBoundingClientRect();
  const currentScrollPosition =
    window.scrollY || document.documentElement.scrollTop;

  if (currentScrollPosition > previousScrollPosition) {
    if (
      rect.bottom >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight)
    ) {
      if (wheelCounter < 3) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (wheelCounter === 0) {
        side("inovation");
      } else if (wheelCounter === 1) {
        side("empoyer");
      } else if (wheelCounter === 2) {
        side("experiences");
      }
      wheelCounter = (wheelCounter + 1) % 3;
      return false;
    }
  }
  // else {
  //   if (rect.top >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)-100) {
  //     console.log("Scrolling up");
  //     event.preventDefault();
  //     event.stopPropagation();

  //     return false;
  //   }
  // }
  previousScrollPosition = currentScrollPosition;
}

window.side = (keyword) => {
  const els = document.getElementsByClassName("text1");
  const els2 = document.getElementsByClassName("text2");
  const els3 = document.getElementsByClassName("text3");

  const btn = document.getElementById("button1");
  const btn2 = document.getElementById("button2");
  const btn3 = document.getElementById("button3");
  switch (keyword) {
    case "inovation":
      btn.style.backgroundColor = "white";
      btn2.style.backgroundColor = "white";
      btn3.style.backgroundColor = "purple";

      for (const el of els) {
        el.style.display = "none";
      }
      for (const el2 of els2) {
        el2.style.display = "none";
      }
      for (const el3 of els3) {
        el3.style.display = "flex";
      }
      break;
    case "empoyer":
      btn.style.backgroundColor = "purple";
      btn2.style.backgroundColor = "white";
      btn3.style.backgroundColor = "white";

      for (const el of els) {
        el.style.display = "block";
      }
      for (const el2 of els2) {
        el2.style.display = "none";
      }
      for (const el3 of els3) {
        el3.style.display = "none";
      }
      break;
    case "experiences":
      btn.style.backgroundColor = "white";
      btn2.style.backgroundColor = "purple";
      btn3.style.backgroundColor = "white";

      for (const el of els) {
        el.style.display = "none";
      }
      for (const el2 of els2) {
        el2.style.display = "block";
      }
      for (const el3 of els3) {
        el3.style.display = "none";
      }
  }
};

window.showpopup = () => {
  const el = document.getElementById("popup");
  el.style.opacity = "1";
  el.style.display = "block";
};

window.hidepopup = () => {
  const el = document.getElementById("popup");
  el.style.opacity = "1";
  el.style.display = "none";
};
// function togglenav() {
//   var x = document.getElementById("resnav");
//   var nav = document.querySelector("nav");
//     var myimg = document.getElementById("logoimg")
//   nav.classList.add("sticky")
//   if (x.style.display == "none") {
//     x.style.display = "flex";
//   } else if (x.style.display == "flex") {
//     x.style.display = "none";
//   }
// }
function togglenav() {
  var x = document.getElementById("resnav");
  var nav = document.querySelector("nav");
  var myimg = document.getElementById("logoimg");
  var h1 = document.getElementById("hamburger1");
  var h2 = document.getElementById("hamburger2");
  var h3 = document.getElementById("hamburger3");
  var h = document.getElementById("hamburger")
  nav.classList.add("sticky");
  if (x.style.display == "none") {
    x.style.display = "flex";
    myimg.src = "./images/mocartlogoblack.png";
    h2.style.display = "none"
    h1.style.transform = "rotate(45deg)"
    h3.style.transform = "rotate(-45deg)"
    h.style.height = "auto"

  } else if (x.style.display == "flex") {
    x.style.display = "none";
    nav.classList.remove("sticky");
    myimg.src = "./images/mocartlogo.png";
    h1.style.transform = "rotate(0deg)"
    h3.style.transform = "rotate(0deg)"
    h2.style.display = "block"

    h.style.height = "30px"
  }
}
const ContactUs = document.getElementById("contactEL");
ContactUs.addEventListener(
  "pointerdown",
  function () {
    showpopup();
  },
  false
);
ContactUs.addEventListener(
  "touchend",
  function (e) {
    showpopup();
  },
  false
);
