function setup() {
    createCanvas(600, 800);
    background("aqua");
}
  
let shapeColor="aqamarime"
Fill(shapeColor);
noStroke();
function mousePressed (){
    shapeColor="white"
}
function mouseDragged (){
    circle(mouseX, mouseY, 20);
}