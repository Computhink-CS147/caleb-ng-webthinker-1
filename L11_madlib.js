// write your codes here
let button;
let textinput;
let colorPicker;
let secondInput;
function setup() {
    createCanvas(700,700);
    textinput = createInput();
    textinput.position(width/2,100);
    button = createButton("submit");
    // button.position(width/2,150);
    textinput=createInput();
    textinput.position(width/2,200);
    // button = createButton("submit");
    button.position(width/2,250);
    colorPicker = createColorPicker("red");
    colorPicker.position(width/2,300);

    button=createButton("generate");
    button.position(width/2,200);
    button.mousePressed(updatestory);

}
function draw() {
    background(colorPicker.value());
    textSize(20);
    text("tell me your name:", width/2, 110);
    textAlign(RIGHT,CENTER);
    text("tell me your home adress:", width/2, 210);
    textAlign(RIGHT,CENTER);
}
function updatestory(){
    print("hello"+textinput.value());
    print("i am going to"+secondInput.value());
}