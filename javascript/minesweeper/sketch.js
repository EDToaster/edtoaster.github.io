var field = [];
let w = 30;
let h = 30;
let size = 20;

function setup() {
	createCanvas(w * size, h * size);
	colorMode(HSB, 255);

	for(let j = 0; j < h; j++){
		for(let i = 0; i < w; i++){
			let isMine = random() < 0.2;
			field.push({
				x: i,
				y: j,
				mine: isMine,
				n: 0
			});
		}
	}
	
	neighbours();
  
}

function neighbours(){
	field.forEach(b=>{
		let sum = 0;
		for(let i = -1; i <= 1; i++){
			for(let j = -1; j <= 1; j++){
				let x = b.x + i;
				let y = b.y + j;
				if(x < 0 || x >= w || y < 0 || y >= h)
					continue;
				
				let index = y * w + x;
				if(field[index].mine)
					sum++;
			}
		}
		b.n = sum;
	});
	

}

function draw(){
	background(51);
	textAlign(CENTER, CENTER);
	field.forEach(b=>{
		let x = b.x * size;
		let y = b.y * size;
		
		if(b.mine){
			fill(0, 255, 255);
		}else{
			fill(0, 0, 51);
		}
		
		rect(x,y,size,size);
		if(!b.mine && b.n > 0){
			fill(0, 0, 255);
			text(b.n, x + size/2, y + size/2);
		}
	});

}
