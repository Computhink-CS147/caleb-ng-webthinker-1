///ssssss
let countdown=5
let objectid;
let bgcolor="lightgray";
function setup(){
    createCanvas(400,400);
    background(220);
    textAlign(CENTER, CENTER);
}


function draw(){
background(bgcolor);
let h = hour();
let m = minute();
let s = second();
fill(0);
textSize(72);
text(nf(h, 2) + ":" + nf(m, 2) + ":" + nf(s, 2), width/2, height/2);
fill("red");
textSize(32);
text(countdown, width/2, height/2 + 75);
textSize(16);
text("click to start the countdown", width/2, height/2 + 100);
}

function mousePressed(){
    objectid=setInterval(updatecountdown, 1000);
}

function updatecountdown(){
    if (countdown===0){
        clearInterval(objectid);
        bgcolor="red";
    }
    else{
        countdown=countdown-1;
    }
}