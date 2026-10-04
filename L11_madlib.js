// write your codes here
let button;
let textinput;
function setup() {
    createCanvas(700,700);
    textinput = createInput();
    textinput.position(width/2,100);
    button = createButton("click me");
    button.position(width/2,150);

}
function draw() {
    background(200);
    text("tell me your name:", width/2, 120);
}