//variables
var frogger;
var enemies;
var platforms;

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