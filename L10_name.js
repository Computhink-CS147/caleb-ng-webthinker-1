// write your codes here
let textinput;
let someVar;
function setup() {
    createCanvas(600,400);
    background("lime");
    textAlign(CENTER,CENTER);
    textinput = createInput();
    textinput.position(width/2-100,height/2);
    textinput.input(updateMyVar);


}

function draw() {
    background("lime");
    stroke("red");
    strokeWeight(4);
    
    fill("blue");
    rect(130,80,300,100,20,20);
    fill("white");
    textSize(32);
    text(someVar, width/2 , height/2-80);



    
}

function updateMyVar(){
    someVar = textinput.value();

}