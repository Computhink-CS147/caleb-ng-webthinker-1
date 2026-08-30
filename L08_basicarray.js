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
    print(storyText);
}

function draw() {
    background(220);
    textSize(18);
    text("Hyperbaiter",135,ypos);
     text("♪♪♪",165,ypos+30);
     textSize(10);
     text("THE ROCK ON MY A** MADE ME DISABLED",75,ypos+50);
     text("TOLD BRO I HAVE CP BECAUSE I WAS MENTAL",75,ypos+70);
      text("MY BREATH SMELLS LIKE S**T I NEED A MENTO",75,ypos+90);
       text("IM WEIRD AS S**T I JUST LICKED MY TOE",75,ypos+110);
       text("KIM JONG UN IS MASTER OF GOON",75,ypos+130);
       text("ME N P DIDDY HAVE A SNEAKY SNEAKY LINK",75,ypos+110);
       text("IM WEIRD AS",75,ypos+110);
       

    ypos -= 0.67;
}
