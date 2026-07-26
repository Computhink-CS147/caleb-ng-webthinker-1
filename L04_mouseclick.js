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
  circle(100,200,75);
  circle(100,200,225);
  circle(100,200,375);
  circle(525,200,525);
  // Recap 1: Repeating Circles
let circleDiameter= 50;
let circleY=50;
for(let num=1; num<6; num++) {
  fill(num*50,150,100)
  circle(50*num,circleY*num,circleDiameter);
}
}
print(width);