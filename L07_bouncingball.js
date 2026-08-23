// write your codes here
let ballSize =40;
let ballX=0;
let ballY=0;
let ballSpeedX=2;
let ballSpeedY=2;

function setup() {
createCanvas(100,200);
noStroke();


}

function draw(){
    background("red");
    fill(0);
    circle(ballX,ballY,ballSize);

    ballX=ballX+ballSpeedX;
    ballY=ballY+ballSpeedY;

    if(ballX > width) {
        ballSpeedX=-1*ballSpeedX
    }

    
    if(ballX < 0) {
        ballSpeedX=-1*ballSpeedX
    }

    
    if(ballY > height) {
        ballSpeedY=-1*ballSpeedY
    }

    
    if(ballY < 0) {
        ballSpeedY=-1*ballSpeedY
    }

}