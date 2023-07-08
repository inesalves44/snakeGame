// JavaScript source code

var snakeColor;
var backgroundColor;
var walls;
var gameArea;
var snake;
var food;

//get's data from the form
function getFormData() {
    snakeColor = document.getElementById("SnakeColor").value
    backgroundColor = document.getElementById("BackgroundColor").value;
    walls = document.getElementById("Walls").value;


    if (walls !== "true" || walls !== "false") {
        walls = "false";
    }
    StartGame();
    return false;
}

function startGameArea(gameArea) {
    window.addEventListener('keydown', function (e) {
        myGameArea.key = e.key;
    })
    window.addEventListener('keyup', function (e) {
        myGameArea.key = false;
    })
}

//starts game---> game area, and snake
function StartGame() {
    var element = document.getElementById("gameArea");
    element.style.display = "block";
    
    gameArea = document.getElementById("gameTime");
    gameArea.width = 480;
    gameArea.height = 370;
    gameArea.style.backgroundColor = backgroundColor;
    startGameArea();

    element.appendChild(gameArea);
    //setInterval(getFormData, 20);
}
