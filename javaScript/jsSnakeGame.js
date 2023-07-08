//form variables
var snakeColor;
var backgroundColor;
var walls;

//auxiliar variables
var interval;
var speedX = 5;
var speedY = 0;
var crash = false;
var newHead;
var foodX;
var foodY;

//object variables
var snake = [];
var food = {};
var score = 0;

//game Area Object
var gameArea = {
    canvas: null,
    start: function () {
        this.canvas = document.getElementById("gameTime");
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        this.canvas.style.backgroundColor = backgroundColor;
        window.addEventListener('keydown', function (e) {
            gameArea.key = e.key;
        })
        window.addEventListener('keyup', function (e) {
            gameArea.key = false;
        })
        disableScroll();
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(interval);
        enableScroll();
        this.context = this.canvas.getContext("2d");
        this.context.font = '110% Arial';
        this.context.fillStyle = snakeColor;
        this.context.fillText("GAME OVER - SCORE: " + score, 20, 145);
    }
};

//snake Part element
var snakePart = {
    start: function(x, y, color) {
        this.width = 5;
        this.height = 5;
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.border = color;    
    },
}

//disables the scroll when the game is being played
function disableScroll(){
    scrollTop = document.documentElement.scrollTop;
    scrollLeft = document.documentElement.scrollLeft;

    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

//enables the scroll 
function enableScroll() {
    window.onscroll = function() {};
}

//starts game ---> game area, and snake
function startGame() {
    var element = document.getElementById("gameArea");
   
    gameArea.start();
    element.style.display = "block";
    createSnake();
    createFood(snake);
    draw(food);
    element.appendChild(gameArea.canvas);
    interval = setInterval(updateGame, 20);
}

//get's data from the form
function getFormData() {
    snakeColor = document.getElementById("SnakeColor").value
    backgroundColor = document.getElementById("BackgroundColor").value;
    walls = document.getElementById("Walls").value;

    if (walls !== "true" && walls !== "false") {
        walls = "false";
    }
    startGame();
    return false;
}

//draw elements in the canvas
function draw(element) {
    var ctx =  gameArea.canvas.getContext("2d");

    ctx.fillStyle = element.color;
    ctx.fillRect(element.x, element.y, element.width, element.height);
    ctx.strokeStyle = element.border;
    ctx.strokeRect(element.x, element.y, element.width, element.height);
}


//starts the snake in the begining
function createSnake() {
    var snakePartNew;
    var xinitial = gameArea.canvas.width / 2;
    var yinitial = gameArea.canvas.height / 2;

    for (let i = 0; i < 15; i++) {
        snakePartNew = Object.create(snakePart);
        snakePartNew.start(xinitial + (i * 5), yinitial, snakeColor);
        snake.unshift(snakePartNew);
        draw(snakePartNew);
    }
}

//checks that food is not created where the snake is
function checkAreaNotOccupiedBySnake(element) {
    var i = 0;

    while (i < snake.length)
    {
        if (snake[i].x < element.x + element.width && snake[i].x + snake[i].width > element.x 
        && snake[i].y < element.y + element.height && snake[i].y + snake[i].height > element.y){
            foodX = Math.floor(Math.random() * gameArea.canvas.width);
            foodY = Math.floor(Math.random() * gameArea.canvas.height);
            i = 0;
        }
        else {
            i++;
        }
    }
    food.color = snakeColor;
    food.border = snakeColor;
    food.x = foodX;
    food.y = foodY;
    food.width = 3;
    food.height = 3;
}

//checks when the arrows are pressed
function getKeyEvents() {
    if (gameArea.key && gameArea.key === "ArrowLeft" && speedX == 0) {
        speedX = -5;
        speedY = 0;
    }
    else if (gameArea.key && gameArea.key === "ArrowRight" && speedX == 0) {
        speedX = 5;
        speedY = 0;
    }
    else if (gameArea.key && gameArea.key === "ArrowUp" && speedY == 0) {
        speedY = -5;
        speedX = 0;
    }
    else if (gameArea.key && gameArea.key === "ArrowDown" && speedY == 0) {
        speedY = 5;
        speedX = 0;
    }
}

//checks if the snake ate
function checkIfSnakeEats() {
    var snakePartNew;

    if (snake[0].x < food.x + food.width && snake[0].x + snake[0].width > food.x && snake[0].y < food.y + food.height &&
        snake[0].y + snake[0].height > food.y) {
        createFood();
        snakePartNew = Object.create(snakePart);
        snakePartNew.start(snake[snake.length - 1].x + speedX, snake[snake.length - 1].y + speedY, snakeColor);
        snake.push(snakePartNew);
        score += 9;
    } else {
        snake.pop();
    }
}

//creates the food for the snake
function createFood() {
    foodX = Math.floor(Math.random() * (gameArea.canvas.width - 10));
    foodY = Math.floor(Math.random() * (gameArea.canvas.height - 10));
    checkAreaNotOccupiedBySnake(foodX, foodY);
}

//treats walls in the case of the snake goes through them
function treatWalls(newHeadX, newHeadY) {
    if (newHeadX === gameArea.canvas.width)
        newHeadX = 0 + 5;
    else if (newHeadX === 0)
        newHeadX = gameArea.canvas.width - 5;
    else if (newHeadY === gameArea.canvas.height)
        newHeadY = 0 + 5;
    else if (newHeadY === 0)
        newHeadY = gameArea.canvas.height - 5;
    
    newHead = Object.create(snakePart);
    newHead.start(newHeadX, newHeadY, snakeColor);
}

//checks if the snake collided with it self
function checkSnakeCrash() {
    for (var i = 1; i < snake.length && crash === false; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            console.log("Crashed!");
            crash = true;
        }
        if (walls === "true") {

            if (snake[0].x === gameArea.canvas.width - 1 || snake[0].x === 0 + 1
                || snake[0].y === 0 + 1 || snake[0].y === gameArea.canvas.height - 1) {
                console.log("Crashed!");
                crash = true;
            }
        }
    }
}


//updates the game to move the snake and checks if it has eaten
function updateGame() {
    gameArea.clear();

    getKeyEvents();

    treatWalls(snake[0].x + speedX, snake[0].y + speedY);
    snake.unshift(newHead);

    checkSnakeCrash();
    if (crash === true) {
        gameArea.stop();
        return;
    }

    checkIfSnakeEats();
    draw(food);
    for (let i = 0; i < snake.length; i++) {
        draw(snake[i]);
    }
}
