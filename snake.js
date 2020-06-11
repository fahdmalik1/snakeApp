/*This App uses some jquery for querying the Dom
the reason for using var instead of the new convention
let and const is because this app of built when I was
first learning javaScript.*/

$(document).ready(function() {
    //Define all variables.
    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var cw = 15; // this is the cell width.
    var dir = "right";
    var food;
    var score;
    var speed = 130;
    var color = "green";
    var interval;
    //Make the snake array below.
    var snake;

    function init() {
        dir = "right";
        createSnake();
        createFood();
        score = 0;
        if (interval){
            clearInterval(interval);
        }
        interval = setInterval(draw, speed);

    }

    init();

    //create function createSnake.
    function createSnake() {
        var len = 6;
        snake = [];
        for(var i = len-1; i >= 0; i--) {
            snake.push({
                "x" : i,
                "y" : 0
            });
        }
    }

    //create food function.
    function createFood() {
        food = {
            "x" : Math.round(Math.random()*(width-cw)/cw),
            "y" : Math.round(Math.random()*(height-cw)/cw)
        };
    }

    //draw function
    function draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(0,0, width,height);
        ctx.strokeStyle = "white";
        ctx.strokeRect(0,0,width,height);
        canvas.focus();

        var nx = snake[0].x;
        var ny = snake[0].y;

        if(dir == "right") {
            nx++;
        }

        else if (dir == "left") {
            nx--;
        }

        else if (dir == "up") {
            ny--;
        }

        else if (dir == "down") {
            ny++;
        }

        if (nx == -1 || nx == width/cw || ny == -1 || ny == height/cw || checkCollision(nx, ny, snake)) {
            $('#final').html("Final Score: "+ score);
           $('#overlay').fadeIn(300);


            return;
        }
        
        if (nx == food.x && ny == food.y) {
            var tail = {
                "x" : nx,
                "y" : ny
            };

            score++;
            createFood();
        } 

        else {
            var tail = snake.pop();
            tail.x = nx;
            tail.y = ny;
        }
        snake.unshift(tail);

        for(var i = 0; i < snake.length; i++) {
            var c = snake[i];
            drawCell(c.x, c.y);
        }

        drawCell(food.x, food.y);

        checkScore(score);

        $('#score').html('your score is: ' + score);

        function drawCell(x,y) {
            ctx.fillStyle = color;
            ctx.fillRect(x*cw, y*cw, cw, cw);
            ctx.strokeStyle = "white";
            ctx.strokeRect(x*cw, y*cw, cw, cw);


        }

        function checkCollision(x,y,arr) {
            for(var i = 0; i < arr.length; i++) {
                if (arr[i].x == x && arr[i].y == y) {
                    return true;
                }

                else {
                    return false;
                }
            }

        }

        function checkScore(score) {
            if (localStorage.getItem('highscore') === null) {
                localStorage.setItem('highscore', score);
            }

            else {
                if (score > localStorage.getItem('highscore')) {
                    localStorage.setItem('highscore', score);
                }
            }

            $('#high_score').html('Your High score is: ' + localStorage.highscore);
        }

        //add event listener to the DOM for key down events
        $(document).keydown(function(event) {
            var key = event.which;
            if (key == "37" && dir != "right") {
                dir = "left";
            }

            else if (key == "38" && dir != "down") {
                dir = "up";
            }

            else if (key == "39" && dir != "left") {
                dir = "right";
            }

            else if (key == "40" && dir != "up") {
                dir = "down";
            }

        });
    }

});


function resetScore() {
    localStorage.highscore = 0;

    var highest = document.getElementById('high_score');
    highest.innerHTML = "High Score: 0";
   

}
