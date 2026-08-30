let ypos =0;

function setup() {
    createCanvas(400,600);
    background(220);
    ypos= height;
}

function draw() {
    background(220);
    textSize(18);
    text("Hyperbaiter",165,ypos);
     text("",165,ypos+30);
    ypos -= 0.67;
}
