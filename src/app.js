/*----------------
* 変数・定数
----------------------*/
const images = [...document.querySelectorAll(".image-body")];
const imagesCover = [...document.querySelectorAll(".image-cover")];
const sliderBody = document.querySelector(".parts-slider");
let slider_w;
let image_w;
let current = 0;
let target = 0;
let ease = 0.05;
let scale = 0.5;
/*----------------
* 処理
----------------------*/
images.forEach((img, index) => {
  img.style.backgroundImage = `url(./public/img${index + 1}.jpg)`;
});

//線形補間(lerp関数)
const lerp = (start, end, multiplier) => {
  return (1 - multiplier) * start + multiplier * end;
};

const setTransform = (el, transform) => {
  el.style.transform = transform;
};

const init = () => {
  slider_w = sliderBody.getBoundingClientRect().width;
  image_w = slider_w / images.length;
  document.body.style.height = `${slider_w - (window.innerWidth - window.innerHeight)}px`;
};

const animation = () => {
  current = parseFloat(lerp(current, target, ease)).toFixed(2);
  target = window.scrollY;
  setTransform(sliderBody, `translateX(-${current}px)`);
  animationImage();
  // animationScale();
  requestAnimationFrame(animation);
};

const animationImage = () => {
  let ratio = current / image_w;
  let intersectionRatioValue;

  images.forEach((img, index) => {
    intersectionRatioValue = ratio - index * 0.7;
    setTransform(img, `translateX(${intersectionRatioValue * 70}px)`);
  });
};

const animationScale = () => {
  current = parseFloat(lerp(current, target, ease)).toFixed(2);
  target = window.scrollY;
  imagesCover.forEach((img, index) => {
    setTransform(img, `rotate(${current / 10}deg)`);
  });
};

init();
animation();
//リサイズイベント
window.addEventListener("resize", init);
