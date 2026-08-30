let ypos =0;
let lineY=0;
let storyText=[];

function setup() {
    createCanvas(400,600);
    background(220);
    ypos= height;
    storyText[0]="goon goon goon"
    storyText[1]="6767"
    storyText[2]="lick lick lick"
}

function draw() {
    background(220);
    textSize(18);
    text("Hyperbaiter",135,ypos);
     text("♪♪♪",165,ypos+30);
    ypos -= 0.67;
}
