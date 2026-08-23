// write your codes here
let ballSize =40;
let ballX=0;
let ballY=0;
let ballSpeedX=2;
let ballSpeedY=2;

function setup() {
createCanvas(400, 500);
   background("blue");
   fill(0);
noStroke();


}

function draw(){
    
    
    circle(ballX,ballY,ballSize);

    ballX=ballX+ballSpeedX;
    ballY=ballY+ballSpeedY;

    if(ballX > width) {
         fill( random(0,255),0,random(0,255),0,random(10,55) );
        ballSpeedX=-1*ballSpeedX
    }

    
    if(ballX < 0) {
        ballSpeedX=-1*ballSpeedX
    }

    
    if(ballY > height) {
        ballSpeedY=-1*ballSpeedY
        fill( random(0,255),0,random(0,255),0,random(10,55) );
    }

    
    if(ballY < 0) {
         fill( random(0,255),0,random(0,255),0,random(10,55) );
        ballSpeedY=-1*ballSpeedY
    }

}