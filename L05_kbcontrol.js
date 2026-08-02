let size=250
let colour=blue
let showCircle=false
let showRect=false
let showTri=false

function draw() {
    background=("skyblue");
    if(showCircle) {
    circle(width/2, height/2, size)
    }
    if(showRect) {
        rect(50,50,100,75);

    }
    if(showTri){
        triangle(20,75,58,20,86,75);
    }
}

function keyPressed(){
    if (key==='c'){
        showCircle
        showCircle=!showCircle;
    }
    if(key==="r"){
        
        showRect=!showRect;
    }
    if(key==="t"){

        showTri=!showRect;
    }
}