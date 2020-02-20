var xwing;
var ties = [];
var blasters = [];
var dead = false;
var score = 0;
var highScore = 0;

function preload(){
	xwingImg = loadImage('IMGs/xWing.png');
	tieImg = loadImage('IMGs/tie.png');
}

function setup(){
	var canvas = createCanvas(500,400);
	var x = (windowWidth - width)/2;
	var y = (windowHeight - height)/2;
	canvas.position(x,y);
	xwing = new Xwing();
	flotaImperial();
	win = createVideo('win.mp4', [vidLoad]);
	defeat = createVideo('defeat.mp4',[vidLoad2]);
	win.position(433,CENTER-500);
	win.size(500, 500);
	win.hide();
	defeat.position(433,CENTER-500);
	defeat.size(500, 500);
	defeat.hide();

}


function vidLoad() {
  
  win.volume(50);

}

function vidLoad2(){
	defeat.volume(50);

}



function draw(){
	background(200);
	fill(50);
	rectMode(CENTER);
	rect(width / 2, height / 2, 500, 400);
	xwing.show();
	xwing.mover();
	blasterFunction();
	tieFunc();
	scoreFunc();
	endScreen();
}

// crear una lista que contenga los cazas tie
function flotaImperial(){
	var count = 0;
	for(var i = 0;i < 3; i++){
		for(var j = 0; j < 7; j++){
			ties[count] = new Tie(j * 60 + 40, 20 - i * 60);
			count++;
		}
	}
}

function tieFunc() {
    var edge = false;
    for (var i = 0; i < ties.length; i++) {
 
        if (ties[i].hits(xwing)) {
            dead = true;
        }

        ties[i].move();
        ties[i].show();

        
        if (ties[i].x > width - 15 || ties[i].x < 15) {
            edge = true;
        }

        
        if (ties[i].toDelete) {
            ties.splice(i, 1);
        }
    }

    
    if (edge) {
        for (var i = 0; i < ties.length; i++) {
            ties[i].shiftDown();
        }
    }
}

function blasterFunction() {
    for (var i = 0; i < blasters.length; i++) {
        blasters[i].show();
        blasters[i].move();

       
        for (var j = 0; j < ties.length; j++) {
            if (blasters[i].hits(ties[j])) {
                ties[j].kill();
                blasters[i].kill();
            }
        }

        if (blasters[i].toDelete) {
            blasters.splice(i, 1);
        }
    }
}


function scoreFunc() {
    strokeWeight(6);
    stroke(50);
    fill(255);
    textSize(20);
    text(score, 20, 30);
    text(highScore, width -20, 30);
    noStroke();
}

function endScreen() {
    textSize(90);
    fill(255);
    textAlign(CENTER, CENTER);
    if (!ties.length) {
        win.show();
    	win.play();

    }
    else if (dead) {
       defeat.show();
       defeat.play();
    }
    
}




function mouseClicked() {
	setTimeout(function tiro(){
	var blaster = new Blaster();
    blasters.push(blaster);
},1000);
};


