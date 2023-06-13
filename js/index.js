function _(elm){return document.getElementById(elm)}


window.addEventListener('scroll', preventScroll, { passive: false });
window.addEventListener('wheel', preventScroll, { passive: false });
window.addEventListener('keydown', preventScroll, { passive: false });

function preventScroll(event) {
  const target = event.target;
  const sceneElement = document.querySelector('.game');
  const list_container = document.querySelector('.list_container');

  if (
    sceneElement.contains(target) && 
    !list_container.contains(target)
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
}

function isArrowKey(event) {
  const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  return arrowKeys.includes(event.key);
}






