const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const resetGameBtn = document.querySelector(".reset-button");
const xScoreBox = document.querySelector(".player-x-score");
const oScoreBox = document.querySelector(".player-o-score");

let currentPlayer;
let gameGrid;

let xScore = 0;
let oScore = 0;

const winningPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

init();

function init() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
  });
  newGameBtn.classList.remove("active");
  resetGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
  boxes.forEach((box) => {
    box.classList.remove("win");
  });
  xScoreBox.innerText = `X - Player : ${xScore}`;
  oScoreBox.innerText = `O - Player : ${oScore}`;
}

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";
  let fillCount = 0;
  winningPosition.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      if (gameGrid[position[0]] === "X") {
        answer = "X";
        xScore++;
        xScoreBox.innerText = `X - Player  : ${xScore}`;
      } else {
        answer = "O";
        oScore++;
        oScoreBox.innerText = `O - Player : ${oScore}`;
      }

      //disable pointers so that the game stops.
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  // if we have a winner

  if (answer != "") {
    gameInfo.innerText = `Winner player - ${answer}`;
    newGameBtn.classList.add("active");
    resetGameBtn.classList.add("active");
    return;
  }

  //if there is no winner yet, we must check if there is a tie.

  gameGrid.forEach((box) => {
    if (box !== "") fillCount++;
  });

  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied!";
    newGameBtn.classList.add("active");
    resetGameBtn.classList.add("active");
    return;
  }
}

//adding event listeners to all the boxes
function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function resetGame() {
  xScore = 0;
  oScore = 0;
  init();
}

newGameBtn.addEventListener("click", init);
resetGameBtn.addEventListener("click", resetGame);
