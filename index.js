const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");
let timer;

function showTimer(h, m, s) {
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  timerEl.textContent = `${h}::${m}::${s}`;
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    if (!seconds) return;
    let hours = Math.floor((seconds / (60 * 60)) % 24),
      minutes = Math.floor((seconds / 60) % 60),
      sec = Math.floor(seconds % 60);

    showTimer(hours, minutes, sec);

    timer = setInterval(() => {
      sec--;
      if (hours === 0 && minutes === 0 && sec === 0) {
        clearInterval(timer);
      } else if (sec === -1) {
        sec = 59;
        minutes--;
        if (minutes === -1) {
          minutes = 59;
          hours--;
        }
      }

      showTimer(hours, minutes, sec);
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", (e) => {
  let val = e.target.value;
  inputEl.value = val.replace(/[^\d]/g, "");
});

buttonEl.addEventListener("click", () => {
  clearInterval(timer);
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
