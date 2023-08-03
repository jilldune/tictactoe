function init() {
    // constants and variables
    const X_CLASS = 'x';// player turn 'X'
    const O_CLASS = 'o';// player turn 'O'
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]// all posible game combinations
    let oTurn;// player turn switcher

    // Board Elements.
    const board = document.getElementById('board');// Get the board
    const winningMessageModal = document.getElementById('winnngMessage');
    const winningTextElement = document.querySelector('[data-winning-text]');
    const restartButton = document.getElementById('restartButton');
    
    // Grabbing and adding click events to the cells.
    const cellElements = document.querySelectorAll('[data-cell]');

    // Start the Game by clearing and setting listeners.
    function startGame() {
        oTurn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, {once: true});
        });
        setBoardHoverClass();
        winningMessageModal.classList.remove('show');
    }
    startGame();

    // handle click event on the board
    function handleClick({target}) {
        const cell = target;
        const currentclass = oTurn ? O_CLASS : X_CLASS;
        // place mark
        placeMark(cell, currentclass);
        // check for win
        if(checkWin(currentclass)) {
            endGame(false);
        } else if(isDraw()) {
            // check for draw
            endGame(true);
        } else {
            // switch turn
            swapTurns();
            // recreate board
            setBoardHoverClass();
        }
    }

    // locates the mouse / pointer and places the mark on the board
    function placeMark(cell, currentclass) {
        cell.classList.add(currentclass);
    }

    // checks and changes the turn of a player
    function swapTurns() {
        oTurn = !oTurn;
    }

    // resets the whole board with initial properties
    function setBoardHoverClass() {
        board.classList.remove(X_CLASS);
        board.classList.remove(O_CLASS); 
        if(oTurn) {
            board.classList.add(O_CLASS);
        } else {
            board.classList.add(X_CLASS);
        }
    }

    // checks for a win
    function checkWin(currentclass) {
        return WINNING_COMBINATIONS.some(combinations => {
            return combinations.every(index => {
                return cellElements[index].classList.contains(currentclass);
            })
        });
    }

    // checks if there is a win or a draw and ends the game
    function endGame(draw) {
        if(draw) {
            winningTextElement.innerText = `Draw!`;
        } else {
            winningTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
        }
        winningMessageModal.classList.add('show');
    }

    // Check for a draw game
    function isDraw() {
        return [...cellElements].every(cell => {
            return cell.classList.contains(X_CLASS ) || cell.classList.contains(O_CLASS);
        })
    }

    // restart button
    restartButton.addEventListener('click', startGame);
}
window.addEventListener('load',init);
