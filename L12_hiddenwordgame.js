// write your codes here
const WORDS = [
["apple", "banana",
 "cherry", "date", "elderberry",
  "fig", "grape", "honeydew"],
["ant", "bee", "cat", "dog", "elephant",
 "frog", "goat", "horse"]];
 let guessInput;
 let submitButton;
let message = "";

function setup (){
    createCanvas(400,600);
    guessInput = createInput();
    guessInput.position(10, 10);
    submitButton = createButton("Submit");
    submitButton.position(10, 40);
    submitButton.mousePressed(checkGuess);
}

function draw (){
    background(255, 0, 0);
}
