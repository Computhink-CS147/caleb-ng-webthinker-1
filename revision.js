// let Xpos=0;
// let speed=2;


// function setup (){
//     createCanvas(400,600);

// }

// function draw (){
//     background(255, 0, 0);
//     rectMode(CENTER);
//        Xpos += speed;
//     if (Xpos > width) {
//         speed=speed*-1;
//     }
//     if (Xpos < 0) {
//             speed = speed * -1;
//     }


//     rect(Xpos, height/2, 100, 25);
// }


let planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];
let pos;

function setup() {
    createCanvas(400, 600);
    pos=50
    textSize(20);
    textAlign(CENTER);
}

function draw(){
    background(Black);
    pos=50;
    for (let i=0; i<planets.length; i++){
        text(planets[i], width/2, pos);
        pos=pos+100;
    }

}

