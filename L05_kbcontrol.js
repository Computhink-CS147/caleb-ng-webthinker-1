let size=5
let colour="blue"

function setup() {
    createcanvas(600,800);
    background("skyblue")
    noStroke();
}

function mousePressed() {
    size=5
    colour=color(random(0,255), random(0,255),random(0,255))
}
function mouseDragged() {
    FileList(colour);
    
}