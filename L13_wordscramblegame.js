let score=0;
let streak=0;
let max=0;
let message="";
let scrambled="";
let hiddenword="";
let scrambledButton="";
let guessinput="";
let submitButton;

const WORDS= ["Spain","Argentina","Destructive","Pornography","supercalifragilisticexpialidocious"]
function setup(){
    createCanvas(800,600)
    scrambledButton=createButton("Re-Scramble");
    scrambledButton.position(150,300);
    scrambledButton.style("font-size","18px")
    scrambledButton.size(110,30);
    guessinput=createInput();
    guessinput.position(305,280);
    guessinput.style("font-size","18px");
    guessinput.size(110,30);
    submitButton=createButton("Submit");
    submitButton.position(485,280);
    submitButton.style("font-size","18px");
    submitButton.size(100,30);
    scrambledButton.mousePressed(doScrambleAgain);
    submitButton.mousePressed(checkGuess);
}
function draw(){
    background(220);
    textSize(32);
    textAlign(CENTER,CENTER);
    text("Word Scramble Game",width/2,100);
    text("scrambled word:COITAARN",width/2,160);

    textSize("22")
    text("Score:"+score, width/2,height/2+80);
    text("streak:"+streak+"(Max:"+max+")",width/2,height/2+110);
    text(message,width/2,height/2+140);

}
function doScrambleAgain(){

}
function checkGuess(){

}
function chooseHiddenWord(){
    hiddenword=random(WORDS);
    hiddenword=
}
function scrambleWord(aWord){
    let arrLetters=aword.split("");
    for (let arrLette)

}