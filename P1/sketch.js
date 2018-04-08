var img;
var angle = 0;
var showPic = true;
numPoints = 1000;
points = [];
image_str = "guy.png"

function preload(){
	img = loadImage(image_str);
}

function setup() {
	createCanvas(img.width, img.height);
	noStroke();

	for(var i = 0; i<=numPoints; i++){
		console.log(i);
		var x = random(0, img.width);
		var y = random(0, img.height);
		var p = img.get(x,y)
		var m = random(1,50)
		points.push([p, x, y, m]);
	}
}

function draw() {
	if(showPic){
		image(img,0,0);
	}else{
		background(255);
	}

	
	for(var i = 0; i<points.length; i++){
		fill(points[i][0]);
		var x = points[i][1];
		var y = points[i][2];
		
		var angle = millis()*0.01+x;
		var r = 30+(sin(angle)*10)+points[i][3];
		
		mouse = (dist(mouseX, mouseY, x, y)/10);
		ellipse(x, y, constrain(r-mouse,10,1000), constrain(r-mouse,10,1000));
	}
}

function mouseClicked() {
		console.log("clicked "+ showPic);
		showPic = !showPic;
}
