///ssssss
function setup(){
    createCanvas(400,400);
    background(220);
    textAlign(CENTER, CENTER);
}


function draw(){
background(220);
let h = hour();
let m = minute();
let s = second();
fill(0);
textSize(72);
text(nf(h, 2) + ":" + nf(m, 2) + ":" + nf(s, 2), width/2, height/2);
fill("")
}

