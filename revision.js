let Xpos=0;
let speed=2;


function setup (){
    createCanvas(400,600);

}

function draw (){
    background(255, 0, 0);
    rectMode(CENTER);
       Xpos += speed;
    if (Xpos > width + 50) {
        Xpos ;
    }
        if (Xpos < 0) {
            speed = speed * -1;
    }


    rect(Xpos, height/2, 100, 25);
}
