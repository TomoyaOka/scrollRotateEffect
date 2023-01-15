/*----------------
* 変数・定数
----------------------*/
const container = document.querySelector(".container");
const items = document.querySelectorAll(".item");
let body_h = container.getBoundingClientRect().height;
let current = container.getBoundingClientRect().top;
let ease = 0.05;
let target = 0;
let bodyCurrent = 0;
let bodyTarget = 0;
document.body.style.height = `${body_h}px`;
/*----------------
* 処理
----------------------*/
const lerp = (start, end, multiplier) => {
  return (1 - multiplier) * start + multiplier * end;
};

const bodyScroll = () => {
  bodyCurrent = parseFloat(lerp(bodyCurrent, bodyTarget, ease)).toFixed(2);
  bodyTarget = window.scrollY;
  container.style.top = `-${bodyCurrent}px`;
  requestAnimationFrame(bodyScroll);
};

window.addEventListener("scroll", () => {
  current = parseFloat(lerp(current, target, ease)).toFixed(2);
  target = window.scrollY;
});

const scrollEffect = () => {
  let newPosition = container.getBoundingClientRect().top;
  let setPosition = current - newPosition;
  let speed = setPosition * 0.5;

  items.forEach((item, index) => {
    item.style.transform = `rotateX(${speed}deg) rotateY(${speed}deg)`;
  });

  current = newPosition;
  requestAnimationFrame(scrollEffect);
};

bodyScroll();
scrollEffect();
