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
for(let num=1; num<9; num++) {
  fill(num*5)
  circle(50*num,circleY*num,circleDiameter);
}
  // Task 1: Colour Gradient


  // Task 2: Colour Loop

  // Task 3: Row of Circles

  // Task 4: Grid of Circles
}