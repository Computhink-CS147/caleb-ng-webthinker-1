let size=5;
let colour="blue";

function setup() {
    createCanvas(2000,2000);
    background("skyblue");
    noStroke();
}

function mousePressed() {
    size=5;
    colour=color(random(0,255), random(0,255),random(0,255));
}
function mouseDragged() {
    fill(colour);
    circle(mouseX, mouseY, size);
    size=size +0.5;
}

let size=50;
let colour=blue
function setup (){
    createCanvas(600,600)
    background
}