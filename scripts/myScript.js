


//string manipulation
const specialPara = document.getElementById("special");
specialPara.innerHTML = "(use arrow keys-left/right to control)";


//allows js to get the canvas for the other elements
const canvas = document.getElementById("myCanvas");

    
//declares all values (I didn't know at first what would be a constant(I know what const and let stand for, I just didn't know how the variables would act in the code yet.)
	const CanvasContent = canvas.getContext("2d");
    let ballRadius = 15;
    let x = canvas.width/2;
    let y = canvas.height-30;
    let dx = 2;
    let dy = -2;
    let paddleHeight = 10;
    let paddleWidth = 75;
    let paddleX = (canvas.width-paddleWidth)/2;
    let rightPressed = false;
    let leftPressed = false;
    let brickRowCount = 11;
    let brickColumnCount = 4;
    let brickWidth = 30;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;
    let score = 0;
    let lives = 5;
    let bricks = [];
	
	
    for(let c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(let r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
	
	//events and their listeners
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
	
	
    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }
//check for collisions(both paddle and bricks)
    function collisionDetection() {
        for(let c = 0; c < brickColumnCount; c++) {
            for(let r = 0; r < brickRowCount; r++) {
                let b = bricks[c][r];
                if(b.status == 1) {
                    if(x >= b.x && x <= b.x + brickWidth && y >= b.y && y <= b.y + brickHeight) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score == brickRowCount * brickColumnCount) {
                            alert("Congragulations, You win!");
							clearInterval(interval);
                        }
                    }
                }
            }
        }
    }
	
	
//re-draws ball every few frames
    function drawBall() {
        CanvasContent.beginPath();
        CanvasContent.arc(x, y, ballRadius, 0, Math.PI*2);
        CanvasContent.fillStyle = "ffffff";
        CanvasContent.fill();
        CanvasContent.closePath();
    }
//re-draws paddle every few frames
    function drawPaddle() {
        CanvasContent.beginPath();
        CanvasContent.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        CanvasContent.fillStyle = "#ffffff";
        CanvasContent.fill();
        CanvasContent.closePath();
    }
//draws array of bricks if a brick is hit
    function drawBricks() {
        for(var c=0; c<brickColumnCount; c++) {
            for(let r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    let brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    let brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    CanvasContent.beginPath();
                    CanvasContent.rect(brickX, brickY, brickWidth, brickHeight);
                    CanvasContent.fillStyle = "#ffffff";
                    CanvasContent.fill();
                    CanvasContent.closePath();
                }
            }
        }
    }
//creates score tracker, depends on how many blocks
    function drawScore() {
        CanvasContent.font = "16px Arial";
        CanvasContent.fillStyle = "#eee";
        CanvasContent.fillText("Score: "+score, 8, 20);
    }
//creates life tracker, depends on how many times paddle missed ball
    function drawLives() {
        CanvasContent.font = "16px Arial";
        CanvasContent.fillStyle = "#eee";
        CanvasContent.fillText("Lives: "+lives, 100, 20);
    }
//function to call all functions and arranges then in the canvas
    function draw() {
        CanvasContent.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if(!lives) {
                    alert("Game over, You ran out of lives!");
					clearInterval(interval);
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 3;
                    dy = -3;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }
        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }
    draw();
//allows player to play again(I cheated, it only reloads the page)
	function clickPlayagain() {
	location.reload();
}