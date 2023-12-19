document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".box");
  const textElement = document.querySelector(".text");
  const replayButton = document.querySelector(".replay");

  let currentPlayer = "O";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let onePlayerMode = false;

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("mode") === "1") {
    onePlayerMode = true;
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return gameBoard[a];
      }
    }

    if (gameBoard.every((box) => box !== "")) {
      return "TIE";
    }

    return null;
  }


  function handleBoxClick(index) {
    if (gameBoard[index] === "" && !checkWinner()) {
      gameBoard[index] = currentPlayer;
      boxes[index].innerHTML = `<span>${currentPlayer}</span>`;
      boxes[index].classList.add("disabled");

      const winner = checkWinner();

      if (winner) {
        const endGameMessage = winner === "TIE" ? "It's a tie!" : `${winner} wins!`;
        textElement.innerHTML = `<h2 class="end-game-message">${endGameMessage}</h2>`;
        replayButton.style.display = "block"; 
      } else {
        if (onePlayerMode && currentPlayer === "O") {
         
          setTimeout(() => makeComputerMove(), 1000);
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      }
    }
  }


  function makeComputerMove() {
    const emptyBoxes = gameBoard.reduce((acc, value, index) => {
      if (value === "") {
        acc.push(index);
      }
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    const computerMove = emptyBoxes[randomIndex];

    gameBoard[computerMove] = "X";
    boxes[computerMove].innerHTML = `<span>X</span>`;
    boxes[computerMove].classList.add("disabled");

    const winner = checkWinner();
    if (winner) {
      const endGameMessage = winner === "TIE" ? "It's a tie!" : `${winner} wins!`;
      textElement.innerHTML = `<h2 class="end-game-message">${endGameMessage}</h2>`;
      replayButton.style.display = "block";
    } else {
      currentPlayer = "O";
    }
  }


  boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleBoxClick(index));
  });
});
