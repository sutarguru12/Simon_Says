let gameSeq = [];
let userSeq = [];
let h4 = document.querySelector("h4");
let h5 = document.querySelector(".highest-score");

let btns = ["red", "green", "yellow", "purple"];

let started = false;
let level = 0;
let maxLevel = level;
document.addEventListener("keypress", function () {
  if (!started) {
    console.log("game started...!");
    started = true;

    levelUp();
  }
});

document.addEventListener("click", function (event) {
  if (!started && !event.target.classList.contains("btn")) {
    console.log("game started...!");
    started = true;

    levelUp();
  }
  if (!started && event.target.classList.contains("btn")) {
    h4.innerHTML = `Game over your score is ${maxLevel} <br></br> Click outside the button to restart.`;
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 150);
}

function levelUp() {
  userSeq = [];
  level++;
  h4.innerText = `Level ${level}`;

  let ranIdx = Math.floor(Math.random() * btns.length);
  let ranColor = btns[ranIdx];
  let ranBtn = document.querySelector(`.${ranColor}`);

  gameSeq.push(ranColor);
  //   console.log(gameSeq);

  btnFlash(ranBtn);
}

function highestLevel(curr) {
  if (maxLevel < curr) {
    maxLevel = curr;
    h5.innerText = `Highest Score is ${maxLevel}`;
  }
}
function check(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h4.innerHTML = `Game Over! Your score was <b>${
      level - 1
    }</b> <br/> Press any key to Restart.. `;
    let body = document.querySelector("body");
    body.style.backgroundColor = "red";
    setTimeout(function () {
      body.style.backgroundColor = "";
    }, 500);
    reset();
    console.log("Game Over...!");
  }
}

function btnPress() {
  let btn = this;
  let userbtn = btn.getAttribute("id");
  userSeq.push(userbtn);
  btnFlash(btn);
  check(userSeq.length - 1);
}

let userbtns = document.querySelectorAll(".btn");
for (let ubtn of userbtns) {
  ubtn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  h4.innerHTML = `Game Over! Your score was <b>${
    level - 1
  }</b> <br/> Press any key to Restart.. `;
  highestLevel(level - 1);

  level = 0;
}
