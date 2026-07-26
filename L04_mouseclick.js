// write your codes here

function setup() {
    createCanvas(600, 800);
    background("aqua");
}
function setup() {
    createCanvas(600, 400);
    background(220);
    noLoop(); // Stops continuous drawing
  }
  
function draw() {
  circle(75,200,100);
  circle(225,200,100);
  circle(375,200,100);
  circle(525,200,100);
  // Recap 1: Repeating Circles
let circleDiameter= 50;
let circleY=50;
let circleX=350;
for(let num=1; num<6; num++) {
  fill(num*50,150,100)
  circle(-50*num,circleY*num,circleDiameter);
}
}
print(width);