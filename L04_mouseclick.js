// write your codes here

function setup() {
    createCanvas(600, 800);
    background("aqua");
}
  
let shapeColor="aqamarime"
Fill(shapeColor)
function mousepressed (){
    shapeColor="white"
}
function mousemoved (){
    circle(mouseY, mouseY, 20);
}