var qt;
let offsetX = 0;
let offsetY = 0;

function queryPixels(bounds) {
	if(!img)
		return;
		
	img.loadPixels();
	
	let factor = 4;
	
	let sx = bounds.Left();
	let sy = bounds.Top();
	let ex = bounds.Right();
	let ey = bounds.Bottom();
	
	let pixels = [];
	
	for(let sx = 0; 
	
}

let c;
let img;

function setup() {
  c = createCanvas(600, 600);
  background(41);
  c.drop(got);
}

function draw() {
	if(img){
		image(img, 0, 0, width, height);
		
	
	}
}


function got(file){
	if(file.type === "image"){
		img = createImg(file.data).hide();
	}
}
