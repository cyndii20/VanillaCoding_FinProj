const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const form = document.querySelector("form");
const finish = document.getElementById("finish");
const start = document.getElementById("start");
const textInput = document.getElementById("textInput");

let chance = 0;
let strike = 0;
let ball = 0;

startBtn.addEventListener("click", () => {
  const rand = Math.floor(Math.random() * 900 + 100).toString();
  localStorage.setItem("randNum", rand);
  textInput.classList.remove("hidden");
  startBtn.classList.add("hidden");
  console.log(rand);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const val = document.getElementById("textInput").value;
  const randomNum = localStorage.getItem("randNum");
  console.log(val);

  if (chance >= 10) {
    start.classList.add("hidden");
    finish.classList.remove("hidden");
    restartBtn.classList.remove("hidden");
  }

  if (val < 100 || val > 999) {
    alert("세자리 숫자를 입력해주세요!(100 ~ 999)");
  } else {
    for (var i = 0; i < 3; i++) {
      if (randomNum[i] === val[i]) {
        strike++;
      }

      for (var j = 0; j < 3; j++) {
        if (randomNum[i] === val[j]) {
          ball++;
        }
      }
    }
    ball -= strike;
  }

  const strikeRes = document.getElementById("strike");
  const ballRes = document.getElementById("ball");

  strikeRes.textContent = `Strike : ${strike}`;
  ballRes.textContent = `Ball : ${ball}`;

  strike = 0;
  ball = 0;
  chance++;
});

restartBtn.addEventListener("click", () => {
  window.location.reload();
});
