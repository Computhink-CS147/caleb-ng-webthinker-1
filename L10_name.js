// write your codes here
let textInput;
let someVar="";
let ageInput;
let someAge="2";
function setup() {
    createCanvas(600,400);
    background("lime");
    textAlign(CENTER,CENTER);
    textInput = createInput();
    textInput.position(width/2-100,height/2);
    textInput.input(updateMyVar);
    ageInput = createInput();
    ageInput.position(width/2-100,height/2+40);
    ageInput.input(updateMyAge);


}

function draw() {
    background("lime");
    stroke("red");
    strokeWeight(4);

    fill("blue");
    rect(150,10,300,150,20,20);
    fill("white");
    textSize(32);
    text(someVar, width/2 , height/2-150);
    text(someAge, width/2 , height/2-100);
    fill("black");

    textSize(16);
    text("tell me your name:", 70, height/2+10);
       text("tell me your age:", 70, height/2+50);
    fill("black");
    strokeWeight("1");




    
}

function updateMyVar(){
    someVar = textInput.value();
   

}
function updateMyAge(){
    someAge = ageInput.value();
}