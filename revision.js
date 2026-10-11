let Xpos=0;
let speed=2;


function setup (){
    createCanvas(400,600);

}

function draw (){
    bac
    rectMode(CENTER);
    rect(Xpos, height/2, 100, 25);
    Xpos += speed;
    if (Xpos > width + 50) {
        Xpos = -50;
    }

}