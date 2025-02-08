document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const checkWinner = () => {
        for (let condition of winningCombinations) {
            let [a, b, c] = condition;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                statusText.textContent = `Player ${gameBoard[a]} Wins!`;
                return;
            }
        }
        if (!gameBoard.includes("")) {
            gameActive = false;
            statusText.textContent = "It's a Draw!";
        }
    };

    const handleCellClick = (e) => {
        const cellIndex = e.target.getAttribute("data-index");
        if (gameBoard[cellIndex] !== "" || !gameActive) return;

        gameBoard[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add(currentPlayer.toLowerCase());

        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (gameActive) statusText.textContent = `Player ${currentPlayer}'s Turn`;
    };

    const resetGame = () => {
        gameBoard.fill("", 0, 9);
        gameActive = true;
        currentPlayer = "X";
        statusText.textContent = "Player X's Turn";
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("x", "o");
        });
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
});
