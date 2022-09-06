const X_CLASS = "x"
const CIRCLE_CLASS ="circle"
const currentTurn = document.querySelector('.currentTurn')
const squaresElements = document.querySelectorAll('.square')
const board = document.getElementById("board")
const WINNING_Message = document.querySelector(".winning__message")
const winning__container = document.querySelector('.winning__container')
const restartButton = document.querySelector(".restart")
let circleTurn=0, xTurn=0
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
restartButton.addEventListener('click',StartGame)
function StartGame(){
    circleTurn=0
    xTurn=0
    squaresElements.forEach(square =>{
        square.classList.remove(X_CLASS)
        square.classList.remove(CIRCLE_CLASS)
        square.removeEventListener('click',handleClick)
        square.addEventListener('click',handleClick,{once : true})
    })
    winning__container.classList.remove("show")
    Random_start()

    setBoardHoverClass()
}
function Random_start() {
    const Random_number = Math.floor(Math.random() * 10) + 1;
    const num = Random_number % 2
    switch(num){
        case 0 : circleTurn = 1
        case 1 : xTurn = 1
    }
    (num === 0) ? currentTurn.innerHTML = "Circle turn" : currentTurn.innerHTML = "X turn"
}
function handleClick(e){
    const cell = e.target
    const CurrentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    PlaceMark(cell,CurrentClass)
    if(CheckWin(CurrentClass)){
        EndGame(false)
    }else if(isDraw()){
        EndGame(true)
    }else{
        swapTurn()
        setBoardHoverClass()
    }

}
function EndGame(draw){
    if(draw){
        WINNING_Message.innerHTML = `Draw!`
    }else{
        WINNING_Message.innerHTML = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winning__container.classList.add("show")
}

function isDraw(){
    return [...squaresElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function PlaceMark(cell,CurrentClass){
    cell.classList.add(CurrentClass)
}

function swapTurn(){
    circleTurn = !circleTurn
    let newTurn = (circleTurn == 1 ) ? currentTurn.innerHTML = "Circle turn" : currentTurn.innerHTML = "X turn"
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function CheckWin(CurrentClass){
    return WINNING_COMBINATIONS.some(COMBINATIONS => {
        return COMBINATIONS.every(index =>{
            return squaresElements[index].classList.contains(CurrentClass)
        })
    })
}
StartGame()