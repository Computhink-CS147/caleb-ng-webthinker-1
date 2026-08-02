function setup() {
    createCanvas(600, 800);
    background("white");
}
  
let shapeColor="aquamarime"
Fill(shapeColor);
noStroke();
function mousePressed (){
    shapeColor="white"
}
function mouseDragged (){
    circle(mouseX, mouseY, 20);
}