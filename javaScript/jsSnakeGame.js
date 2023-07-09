//form variables
var snakeColor;
var backgroundColor;
var walls;

//auxiliar variables
var interval;
var crash = false;
var newHead;
var foodX = 0;
var foodY = 0;
var score = 0;
var speedX = 5;
var speedY = 0;
var elementGame = document.getElementById("gameArea");

//constants
const SNAKE_SIDE = 5;
const FOOD_SIDE = 3;
const INITIAL_SNAKE_LENGTH = 15;

//object variables

//creates the start butoon
var startButton = {
    button: null,
    create: function(){
        this.button = document.createElement("startButton");

        this.button.id = "startButton";
        this.button.textContent = "Start Game";
        this.button.style.backgroundColor = 'white';
        this.button.style.font = '90% Arial';
        this.button.addEventListener("click", startGame);
    },
};

//creates the elements of the snake Array
var snakePart = {
    start: function(x, y, color) {
        this.width = SNAKE_SIDE;
        this.height = SNAKE_SIDE;
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.border = color;    
    },
}

// variable snake
// drawSnake: draws snake
//start: starts the snake at the beginning of the game
//reset: resets the snake array at the end of the game
//checkCrashSnake: checks if the snake collided with itself
//checkWallCrash: checks if the snake crashed with the wall
//checkEating: checks if the snake ate
var snake = {
    snakeArray: [],
    
    drawSnake: function() {
        for (let i = 0; i < this.snakeArray.length; i++) {
            gameArea.drawElement(this.snakeArray[i]);
        }
    },

    start: function(){
        var snakePartNew;
        var xInitial = 1;
        var yInitial = gameArea.canvas.height / 2;

        for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
            snakePartNew = Object.create(snakePart);
            snakePartNew.start(xInitial + (i * SNAKE_WIDTH), yInitial, snakeColor);
            this.snakeArray.unshift(snakePartNew);
        }
        this.drawSnake();
    },

    reset: function(){
        this.snakeArray = [];
        score = 0;
        crash = false;
    },

    checkCrashSnake: function(){
        for (var i = 1; i < this.snakeArray.length && crash === false; i++) {
            if (this.snakeArray[0].x === this.snakeArray[i].x && this.snakeArray[0].y === this.snakeArray[i].y) {
                crash = true;
            }
        }
    },

    checkWallCrash: function() {
        if (this.snakeArray[0].x >= gameArea.canvas.width - SNAKE_WIDTH || this.snakeArray[0].x <= SNAKE_WIDTH
            || this.snakeArray[0].y <= SNAKE_WIDTH || this.snakeArray[0].y >= gameArea.canvas.height - SNAKE_WIDTH) {
            crash = true;
        }
    },

    checkEating: function() {
        var snakePartNew;

        if (this.snakeArray[0].x < food.x + food.width && this.snakeArray[0].x + this.snakeArray[0].width > food.x && this.snakeArray[0].y < food.y + food.height &&
        this.snakeArray[0].y + this.snakeArray[0].height > food.y) {
            food.create();
            snakePartNew = Object.create(snakePart);
            snakePartNew.start(this.snakeArray[this.snakeArray.length - 1].x + speedX, this.snakeArray[this.snakeArray.length - 1].y + speedY, snakeColor);
            this.snakeArray.push(snakePartNew);
            score += 9;
        } else {
            this.snakeArray.pop();
            food.drawFood();
        }
        this.drawSnake();
    },
};

//all funtions related to the food
//generateXY: generates coordenates for foodX and foodY
//checkArea: checks the area occupied by the snake and makes sure the food is not created there
//creates: creates and draws the object
var food = {
    generateXY: function() {
        foodX = Math.floor(Math.random() * (gameArea.canvas.width - 10));
        foodY = Math.floor(Math.random() * (gameArea.canvas.height - 10));
        this.x = foodX;
        this.y = foodY;
    },

    checkArea: function() {
        var i = 0;

        while (i < snake.length)
        {
            if (snake[i].x < this.x + this.width && snake[i].x + snake[i].width > this.x 
            && snake[i].y < this.y + this.height && snake[i].y + snake[i].height > this.y){
                this.generateXY();
                i = 0;
            }
            else {
                i++;
            }
        }
    },

    drawFood: function(){
        gameArea.drawElement(this);
    },

    create: function() {
        this.generateXY();
        this.checkArea();
        this.color = snakeColor;
        this.border = snakeColor;
        this.x = foodX;
        this.y = foodY;
        this.width = FOOD_SIDE;
        this.height = FOOD_SIDE;
        this.drawFood();
    },
};

//game Area Object
//create: creates the object
//clear: clears it each interval and in the end
//stop: stops the game
//drawElement: draws elements on the canva
var gameArea = {
    canvas: null,
    create: function() {
        this.canvas = document.getElementById("gameTime");
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.canvas.style.backgroundColor = backgroundColor;
        this.context = this.canvas.getContext("2d");
    },

    clear: function () {
        if (this.canvas !== null){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.restore();
        }
    },

    stop: function () {
        clearInterval(interval);
        enableScroll();
        this.context = this.canvas.getContext("2d");
        this.context.font = '110% Arial';
        this.context.fillStyle = snakeColor;
        this.context.fillText("GAME OVER - SCORE: " + score, 20, 145);
        startButton.button.disabled = false;
    },

    drawElement: function(element) {
        var ctx = this.canvas.getContext("2d");

        ctx.fillStyle = element.color;
        ctx.fillRect(element.x, element.y, element.width, element.height);
        ctx.strokeStyle = element.border;
        ctx.strokeRect(element.x, element.y, element.width, element.height);
    },
};

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

//get's data from the form
function getFormData() {
    snakeColor = document.getElementById("SnakeColor").value
    backgroundColor = document.getElementById("BackgroundColor").value;
    walls = document.getElementById("Walls").value;

    if (walls !== "true" && walls !== "false") {
        walls = "false";
    }
    startGameArea();
    return false;
}


//creates game Area and button and puts them in canvas
function startGameArea() {
    if (startButton.button === null)
        startButton.create();
    
    gameArea.create();
    elementGame.appendChild(gameArea.canvas);
    elementGame.appendChild(startButton.button);
    elementGame.style.display = "block";
}

//starts the game after pressing the start button, setting an interval, creating the elements and disabeling the scroll
function startGame() {
    gameArea.clear();
    snake.reset();
    

    snake.start();
    food.create();

    interval = setInterval(updateGame, 20);

    window.addEventListener('keydown', function (e) {
        gameArea.key = e.key;
    })
    window.addEventListener('keyup', function (e) {
        gameArea.key = false;
    })
    disableScroll();
}

//checks when the arrows are pressed and changes the snake speed accordingly
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

//treats walls in the case of the snake goes through them if the walls variables is true
function treatWalls(newHeadX, newHeadY) {

    if (newHeadX >= gameArea.canvas.width)
        newHeadX = SNAKE_WIDTH;
    else if (newHeadX <= 0)
        newHeadX = gameArea.canvas.width - SNAKE_WIDTH;
    else if (newHeadY >= gameArea.canvas.height)
        newHeadY = SNAKE_WIDTH;
    else if (newHeadY <= 0)
        newHeadY = gameArea.canvas.height - SNAKE_WIDTH;
    
    newHead = Object.create(snakePart);
    newHead.start(newHeadX, newHeadY, snakeColor);
}


//updates the game to move the snake and checks if it has eaten and if it crashed
function updateGame() {
    gameArea.clear();

    getKeyEvents();

    if (walls === "true") {
        snake.checkWallCrash();
        if (crash === true) {
            gameArea.stop();
            return;
        }
    }
        
    treatWalls(snake.snakeArray[0].x + speedX, snake.snakeArray[0].y + speedY);
    snake.snakeArray.unshift(newHead);

    snake.checkCrashSnake();
    if (crash === true) {
        gameArea.stop();
        return;
    }

    snake.checkEating();
}
