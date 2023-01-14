/*----------------
* 変数・定数
----------------------*/
const container = document.querySelector(".container");
const canvas = document.querySelector(".canvas");
const columnOne = document.querySelector(".one");
const columnTwo = document.querySelector(".two");
const columnThree = document.querySelector(".three");
const columnFour = document.querySelector(".four");
let x = 0;
let y = 0;
let current = 0;
let target = 0;
let ease = 0.05;
let images;
/*----------------
* 処理
----------------------*/

const setImage = () => {
  for (let i = 0; i <= 16; i++) {
    let imgDiv = document.createElement("div");
    imgDiv.className = "image-cover";
    let divImage = document.createElement("img");
    divImage.setAttribute("src", `./img${i}.jpg`);
    imgDiv.appendChild(divImage);

    if (i < 5) {
      columnOne.appendChild(imgDiv);
    } else if (i < 9) {
      columnTwo.appendChild(imgDiv);
    } else if (i < 13) {
      columnThree.appendChild(imgDiv);
    } else {
      columnFour.appendChild(imgDiv);
    }
  }
};

//線形補間(lerp関数)
const lerp = (start, end, multiplier) => {
  return (1 - multiplier) * start + multiplier * end;
};

function animation(event) {
  x = event.clientX - container.getBoundingClientRect().left;
  y = event.clientY - container.getBoundingClientRect().top;
  canvas.style.transform = `translate(-${x}px,-${y * 2}px)`;
}

function animationMobile(event) {
  x = event.changedTouches[0].pageX - container.getBoundingClientRect().left;
  y = event.changedTouches[0].pageY - container.getBoundingClientRect().top;
  canvas.style.transform = `translate(-${x}px,-${y * 2}px)`;
}

function animationImage() {
  let intersectionRatioValue;
  images.forEach((img, index) => {
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = (x + y) / 100;
    intersectionRatioValue = current - index * 0.7;
    img.style.transform = `translate(${intersectionRatioValue}px,${intersectionRatioValue}px)`;
  });

  requestAnimationFrame(animationImage);
}

setTimeout(() => {
  images = [...document.querySelectorAll(".image-cover img")];
  animationImage();
}, 100);

setImage();
window.addEventListener("mousemove", animation);
window.addEventListener("touchmove", animationMobile);
