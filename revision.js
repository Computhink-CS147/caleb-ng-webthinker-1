let Xpos=0;
let speed=2;


function setup (){
    createCanvas(400,600);
    background("red");

}

function draw (){
    RectMode(CENTER);
    rect(Xpos, height/2, 100, 25);
    COLOR("blue");
    Xpos += speed;
    if (Xpos > width + 50) {
        Xpos = -50;
    }

}