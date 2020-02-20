var xwingImg;
var mx = 1;

function Xwing(){
	this.x = width/2;
	this.r = 15;



	this.show = function(){
		image(xwingImg, this.x - 15, height - 50,40,40);
	}

	this.mover = function(){
		
		let easing = 0.05;
		 if (abs(mouseX - mx) > 0.1) {
   			 mx = mx + (mouseX - mx) * easing;
  		}

  		mx = constrain(mx, 80, width-80);
  		this.x = mx;
}
}