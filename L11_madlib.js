// write your codes here
let button;
let textinput;
function setup() {
    createCanvas(700,700);
    textinput = createInput();
    textinput.position(width/2,100);
    button = createButton("submit");
    button.position(width/2,150);
    textinput=createInput();
    textinput.position(width/2,200);
    button = createButton("submit");
    button.position(width/2,250);

}
function draw() {
    background(200);
    textSize(20);
    text("tell me your name:", width/2, 110);
    textAlign(RIGHT,CENTER);
    text("tell me your home adress:", width/2, 210);
    textAlign(RIGHT,CENTER);
}