let size=250
let colour=("blue")
let showCircle=false
let showRect=false
let showTri=false


function setup () {
    createCanvas(600,600);
    background("skyblue")
}


function draw() {
    background=("white");
    if(showCircle) {
        fill("white")
    ellipse(200,200 ,200, 200)
    }
    if(showRect) {
        fill("red")
        rect(50,50,100,75);

    }
    if(showTri){
        fill("blue")
        triangle(20,75,58,20,86,75);
    }
}

function keyPressed(){
    if (key==='c'){
        
        showCircle=!showCircle;
    }
    if(key==="r"){
        
        showRect=showRect;
    }
    if(key==="t"){

        showTri=!showTri;
    }
}