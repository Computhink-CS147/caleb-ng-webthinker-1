// write your codes here
let textinput;
let someVar="";
let ageinput;
let someAge="2";
function setup() {
    createCanvas(600,400);
    background("lime");
    textAlign(CENTER,CENTER);
    textinput = createInput();
    textinput.position(width/2-100,height/2);
    textinput.input(updateMyVar);
    textinput=createInput();
    textinput.position(width/2-100,height/2+40);
    textinput.input(updateMyVar);


}

function draw() {
    background("lime");
    stroke("red");
    strokeWeight(4);

    fill("blue");
    rect(150,80,300,100,20,20);
    fill("white");
    textSize(32);
    text(someVar, width/2 , height/2-80);

    textSize(16);
    text("tell me your name:", 70, height/2+10);
       text("tell me your age:", 70, height/2+50);
    fill("black");
    strokeWeight("1");




    
}

function updateMyVar(){
    someVar = textinput.value();
    someAge = ageinput.value();

}