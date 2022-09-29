import gsap from "gsap";
/*------------------------------
* DOM取得
----------------------------------*/
const stageElement = document.querySelector<HTMLElement>(".stage");
const ballElement = document.querySelectorAll<HTMLElement>(".ball");
/*------------------------------
* 各セッティング
----------------------------------*/
const stageSetting = {
  rotate: 1000,
};

const ballSetting = {
  x: 0,
  y: 0,
  size: 100,
  r: Math.random() * 255,
  g: Math.random() * 255,
  b: Math.random() * 255,
};

const animationSetting = {
  interval: 500,
  duration: 2,
  yoyo: true,
  repeat: -1,
};

/*------------------------------
* 処理定義
----------------------------------*/
function render(): void {
  _styleInit();
  _ballMove();
  _stageMove();
  window.addEventListener("resize", () => {
    _styleInit();
  });
}
render();

function _styleInit(): void {
  //x,y軸に中央
  ballSetting.x = window.innerWidth * 0.5 - ballSetting.size * 0.5;
  ballSetting.y = window.innerHeight * 0.5 - ballSetting.size * 0.5;
  //各ボールにスタイリングを適用
  for (let i = 0; i < ballElement.length; i++) {
    ballElement[i].style.left = `${ballSetting.x}px`;
    ballElement[i].style.top = `${ballSetting.y}px`;
    ballElement[i].style.width = `${ballSetting.size}px`;
    ballElement[i].style.height = `${ballSetting.size}px`;
    ballElement[i].style.background = `rgb(${ballSetting.r},${ballSetting.g},${ballSetting.b})`;
  }
}

function _timeInit(delay: number, center: number) {
  const centerLength: number = center;
  const radius: number = 100 / 2;
  const time: number = new Date().getTime() / delay;
  const x: number = (centerLength + Math.cos(time) * radius) / 2;
  const y: number = (centerLength + Math.sin(time) * radius) / 2;
  return [x, y];
}

function _ballMove(): void {
  const [x01, y01]: number[] = _timeInit(animationSetting.interval, animationSetting.interval);
  const [x02, y02]: number[] = _timeInit(-animationSetting.interval, -animationSetting.interval);

  gsap.to(ballElement[0], {
    x: x01,
    y: y01,
    duration: animationSetting.duration,
    repeat: animationSetting.repeat,
    yoyo: animationSetting.yoyo,
  });
  gsap.to(ballElement[1], {
    x: x02,
    y: y02,
    duration: animationSetting.duration,
    repeat: animationSetting.repeat,
    yoyo: animationSetting.yoyo,
  });
  gsap.to(ballElement[2], {
    x: x01,
    y: y02,
    duration: animationSetting.duration,
    repeat: animationSetting.repeat,
    yoyo: animationSetting.yoyo,
  });
  gsap.to(ballElement[3], {
    x: x02,
    y: y01,
    duration: animationSetting.duration,
    repeat: animationSetting.repeat,
    yoyo: animationSetting.yoyo,
  });
}

function _stageMove(): void {
  gsap.to(stageElement, {
    rotate: stageSetting.rotate,
    duration: 20,
    repeat: animationSetting.repeat,
    yoyo: animationSetting.yoyo,
  });
}
