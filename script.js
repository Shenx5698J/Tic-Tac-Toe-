const board = document.getElementById("board");
const resetButton = document.getElementById("reset");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.textContent = value;
        cell.dataset.index = index;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
    });
}

function handleMove(event) {
    const index = event.target.dataset.index;
    if (!gameBoard[index]) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin()) {
            setTimeout(() => {
                window.location.href = "win.html";
            }, 200);
        } else if (gameBoard.every(cell => cell !== "")) {
            setTimeout(() => {
                window.location.href = "lose.html";
            }, 200);
        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
        gameBoard[pattern[0]] &&
        gameBoard[pattern[0]] === gameBoard[pattern[1]] &&
        gameBoard[pattern[0]] === gameBoard[pattern[2]]
    );
}

resetButton.addEventListener("click", () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    createBoard();
});

createBoard();
