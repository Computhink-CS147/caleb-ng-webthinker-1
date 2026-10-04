// write your codes here
let button;
let nounInput;
let colorPicker;
let verbInput;
let adjInput;
let advInput;
let pInput;
let storyText;
let storytemplates;
function setup() {
    storytemplates = [
        "The {adj} {noun} decided to {verb} {adv} in the {p}.",
        "one day, {adj} {noun} wanted to {verb} in the {p}.",
        "did you know that the {adj} {noun} can {verb} {adv} in the {p}?"
    ] ;
    
    createCanvas(700,900);
    nounInput = createInput();
    nounInput.position(width/2,100);
    // button = createButton("submit");
    // button.position(width/2,150);
    verbInput = createInput();
    verbInput.position(width/2,200);
    // button = createButton("submit");
    // button.position(width/2,250);
    adjInput = createInput();
    adjInput.position(width/2,300);

    advInput = createInput();
    advInput.position(width/2,400);
    
    pInput = createInput();
    pInput.position(width/2,500);
    colorPicker = createColorPicker("red");
    colorPicker.position(width/2,600);

    button=createButton("generate");
    button.position(width/2,550);
    button.mousePressed(storyText);
    template=random(storytemplates);
    
}
function draw() {
    background(colorPicker.value());
    storyText = template.replace("{noun}", "nounInput.value()");
    storyText = storyText.replace("{verb}", "verbInput.value()");
    storyText = storyText.replace("{adj}", "adjInput.value()");
    storyText = storyText.replace("{adv}", "advInput.value()");
    storyText = storyText.replace("{p}", "pInput.value()");
    console.log(storyText);
    textSize(20);
    text("Enter a noun:", width/2, 110);
    textAlign(RIGHT,CENTER);
    text("Enter a verb:", width/2, 210);
    textAlign(RIGHT,CENTER);
    text("Enter an adjective:", width/2, 310);
    textAlign(RIGHT,CENTER);
    text("Enter an adverb:", width/2, 410);
    textAlign(RIGHT,CENTER);
    text("Enter a place:", width/2, 510);
    textAlign(RIGHT,CENTER);
}