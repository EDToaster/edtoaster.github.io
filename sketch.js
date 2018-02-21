let angle = 0;
var bars = [];
let step = 20;
let fieldW = 200;

let radius = fieldW/2;

function setup() {
  createCanvas(400, 400, WEBGL);
  numSteps = fieldW / step;
  for(let i = 0; i < numSteps; i ++){
    for(let j = 0; j < numSteps; j ++){
      let x = -fieldW/2 + step * (i + 0.5);
      let z = -fieldW/2 + step * (j + 0.5);
      //if(distsquared(x,z,0,0) <= radius * radius)
      bars.push(new Bar(x, z, step * 0.8));
    }
  }
}

function draw() {
  background(255);

  ortho(-width/2, width/2,-height/2, height/2, -(width + height), width + height);
  directionalLight(255, 255, 255, -0.5, 0.5, -0.5);
  noStroke();

  rotateX(-QUARTER_PI);
  rotateY(QUARTER_PI);

  bars.forEach(function(element){
    push();
    let c = color(element.getHeight(angle), element.getHeight(-angle),166);
    stroke(c);
    fill(23);
    translate(element.x, 0, element.z);
    box(element.width, element.getHeight(angle), element.width);
    pop();
  });
  angle += 0.05;
}

function Bar(x, z, width){
  this.x = x;
  this.z = z;
  this.width = width;
  this.dist = abs(distsquared(this.x, this.z, 0, 0))/5000;
}

Bar.prototype.getHeight = function(time){
    return map(sin(time - this.dist), -1, 1, 100, 255);
}

function distsquared(x, y, x1, y1){
  return sq(x - x1) + sq(y - y1);
}
