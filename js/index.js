//function _(elm) { return document.getElementById(elm) }
// window.addEventListener('scroll', preventScroll, { passive: false });
// window.addEventListener('wheel', preventScroll, { passive: false });
// window.addEventListener('keydown', preventScroll, { passive: false });

// function preventScroll(event) {
//   const target = event.target;
//   const sceneElement = document.querySelector('.game');
//   const list_container = document.querySelector('.list_container');

//   if (
//     sceneElement.contains(target) &&
//     !list_container.contains(target)
//   ) {
//     event.preventDefault();
//     event.stopPropagation();
//   }
// }
// function isArrowKey(event) {
//   const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
//   return arrowKeys.includes(event.key);
// }
// navbar scrolling function
window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");
  nav.classList.toggle("sticky", window.scrollY > 200)
})

let isFunctionExecuted = false;
window.addEventListener("scroll", function () {
  const div = document.getElementById("counter");
  const rect = div.getBoundingClientRect();
  if (rect.top >= 0 && rect.top <= window.innerHeight) {
    if (!isFunctionExecuted) {counting();isFunctionExecuted = true;}}
    else {isFunctionExecuted = false;}
});

// counter function
const counting = () => {
  let valueDisplays = document.querySelectorAll(".num");
  let interval = 2000
  valueDisplays.forEach(
    (val) => {
      let startValue = 0;
      let endValue = parseInt(val.getAttribute("data-val"));
      let duration = Math.floor(interval / endValue);
      let counter = setInterval(
        () => {
          startValue += 1;
          val.textContent = startValue
          if (startValue == endValue) {
            clearInterval(counter)
          }
        }, duration
      );
    }
  )
}

// mission side bar fucntion
window.side = (keyword) => {
  const els = document.getElementsByClassName("text1")
  const els2 = document.getElementsByClassName("text2")
  const els3 = document.getElementsByClassName("text3")

  const btn = document.getElementById("button1")
  const btn2 = document.getElementById("button2")
  const btn3 = document.getElementById("button3")

  if (keyword == "inovation") {
    btn.style.backgroundColor = "purple"
    btn2.style.backgroundColor = "white"
    btn3.style.backgroundColor = "white"

    for (const el of els) {el.style.display = 'block';}
    for (const el2 of els2) {el2.style.display = 'none';}
    for (const el3 of els3) {el3.style.display = 'none';}
  } else if (keyword == "empoyer") {
    btn.style.backgroundColor = "white"
    btn2.style.backgroundColor = "purple"
    btn3.style.backgroundColor = "white"

    for (const el of els) {el.style.display = 'none';}
    for (const el2 of els2) {el2.style.display = 'block';}
    for (const el3 of els3) {el3.style.display = 'none';}
  } else {
    btn.style.backgroundColor = "white"
    btn2.style.backgroundColor = "white"
    btn3.style.backgroundColor = "purple"

    for (const el of els) {el.style.display = 'none';}
    for (const el2 of els2) {el2.style.display = 'none';}
    for (const el3 of els3) {el3.style.display = 'block';}
  }
}




