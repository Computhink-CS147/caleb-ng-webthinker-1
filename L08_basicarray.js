let ypos =0;

function setup() {
    createCanvas(400,600);
    background(220);
    ypos= height;
}

function draw() {
    background(220);
    textSize(18);
    text("PSLE",100,ypos);
    ypos -= 0.67;
}
