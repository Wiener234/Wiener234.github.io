var canvas;
var canvasContext;

var ballCenterX = 400;
var ballCenterY = 300;
var ballRadius = 10;
var ballSpeedX = 0;
var ballSpeedY = 0;

var paddleMoveSpeed = 12;
var paddleRightMoveSpeed = 25;

var paddle1Y = 250;
var paddle1X = 40;

var paddle2Y = 250;
var paddle2X = 40;


var paddleWidth = 15;

var Score1 = 0;
var Score2 = 0;

const BALL_SPEED_X = 8;
const BALL_SPEED_Y = 5;
const PADDLE_HEIGHT = 100;

var move = 0;

var inBoundsTopPaddle1 = true;
var inBoundsBottomPaddle1 = true;

var win = false;

var firstCollision = false;

document.addEventListener("keydown", function(e) {

    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }

    if(e.code === "ArrowUp" && inBoundsTopPaddle1){
        move = -1;
    }
    else if(e.code === "ArrowDown" && inBoundsBottomPaddle1){
        move = 1;
    }else{
        move = 0
        
    }
    
    if(e.key === " " && win || e.key === " " && ballSpeedX == 0 && ballSpeedY == 0){
        paddle1Y = 250;
        paddle2Y = 250
        Restart();
        win = false;
    }

    if(e.code === "Enter"){
        paddle1Y = 250;
        paddle2Y = 250
        ballReset();
    }
    
});
document.addEventListener("keyup", function(){
    move = 0;
})


window.onload = function(){

    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    

    var FPS = 60;

    setInterval(function(){ 
        drawEverything();
        drawNet();
        Update();
        if(move == 1 && inBoundsBottomPaddle1){
            paddleMove(move);
        }
        if(move == -1 && inBoundsTopPaddle1){
            paddleMove(move);
        }
        
        }, 1000/FPS);

}

function drawNet(){
    for(var i= 0; i < canvas.height; i += 40){
        colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');
    }
}

function paddleMove(direction){
    paddle1Y += paddleMoveSpeed * direction;
}

function ballReset(){
    ballCenterX = canvas.width/2;
    ballCenterY = canvas.height/2
    ballSpeedX = -ballSpeedX;
    if(firstCollision){
        ballSpeedY = BALL_SPEED_Y;
    }
}

function computerMove(){

    var paddle2YCenter = paddle2Y + PADDLE_HEIGHT/2;

    if(paddle2YCenter < ballCenterY - 30){
        paddle2Y += paddleRightMoveSpeed;
    }else if(paddle2YCenter > ballCenterY + 30){
        paddle2Y -= paddleRightMoveSpeed;
    }
}

function Win(){
    if(Score1 >= 10){
        win = true;
        Stop();
        canvasContext.font = '50px serif';
        canvasContext.fillStyle = 'white'
        canvasContext.fillText("Player1 win's", 250, 300);
    }

    if(Score2 >= 10){
        win = true;
        Stop();
        canvasContext.font = '50px serif';
        canvasContext.fillStyle = 'white'
        canvasContext.fillText("Player2 win's", 250, 300);
    }
}

function inBoundsPaddle1(){
    if(paddle1Y <= 0){
        inBoundsTopPaddle1 = false;
    }else{
        inBoundsTopPaddle1 = true;
    }

    if(paddle1Y + PADDLE_HEIGHT >= canvas.height){
        inBoundsBottomPaddle1 = false;
    }else{
        inBoundsBottomPaddle1 = true;
    }
   
}





function Update(){
    computerMove();
    Win();
    inBoundsPaddle1();
    
    

    ballCenterX += ballSpeedX;
    ballCenterY += ballSpeedY;

    if(ballCenterX >= canvas.width){
        ballReset();
        Score1++;
    }

    if(ballCenterX <= 0){
        ballReset();
        Score2++;
    }
    

    if(ballCenterX <= paddle1X + paddleWidth + 5){
        if(ballCenterY + ballRadius + 1 > paddle1Y && ballCenterY - (ballRadius + 1) < paddle1Y + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX
            if(firstCollision == false){
                firstCollision = true;
                ballSpeedY = BALL_SPEED_Y;
            }

            var deltaY = ballCenterY - (paddle1Y + PADDLE_HEIGHT/2)
            ballSpeedY = deltaY * 0.35;

        }
        
        
    }

    if(ballCenterX >= canvas.width - ((paddle2X * 2) + 5)){
        if(ballCenterY + ballRadius + 1 > paddle2Y && ballCenterY - (ballRadius + 1)< paddle2Y + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX

            var deltaY = ballCenterY - (paddle2Y + PADDLE_HEIGHT/2)
            ballSpeedY = deltaY * 0.35;

        }
    }
    

    if(ballCenterY + ballRadius >= canvas.height || ballCenterY - ballRadius <= 0){
        ballSpeedY = -ballSpeedY
    }

    
  
}

function drawEverything(){
    // black background
    colorRect( 0, 0, canvas.width, canvas.height, 'black');
    // left player paddle
    colorRect( paddle1X, paddle1Y, paddleWidth, PADDLE_HEIGHT, 'white');
    // right player paddle
    colorRect( canvas.width - paddle2X - (paddle2X * 0.5), paddle2Y, paddleWidth, PADDLE_HEIGHT, 'white');
    // ball
    colorCircle(ballCenterX, ballCenterY, ballRadius, 'white');
    // set score
    canvasContext.font = '50px serif';
    canvasContext.fillText(Score1, 150, 100);
    canvasContext.fillText(Score2, 600, 100);

    

}

function colorCircle(centerX, centerY, radius, drawColor){

    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc( centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);

}

function Stop(){
    ballSpeedX = 0;
    ballSpeedY = 0;
}

function Play(){
    ballSpeedX = 5;
    ballReset();
}

function Restart(){
    ballSpeedX = BALL_SPEED_X; 
    ballReset();
    Score1 = 0;
    Score2 = 0;
    
}



