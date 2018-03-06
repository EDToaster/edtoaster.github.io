var points = [];
var numPoints = 10000;
var p;

function f(x) {
  return x + .2;
}

function setup() {
  createCanvas(600, 600);

  p = new Perceptron(3);
  for (var i = 0; i < numPoints; i++)
    points.push(new Point(random(-1, 1), random(-1, 1)));
}
var curr = 0;

function draw() {

  background(51);

  stroke(255);
  let p1 = new Point(-1, f(-1));
  let p2 = new Point(1, f(1));

  line(p1.pixelX(), p1.pixelY(), p2.pixelX(), p2.pixelY());

  let p3 = new Point(-1, p.guessY(-1));
  let p4 = new Point(1, p.guessY(1));

  line(p3.pixelX(), p3.pixelY(), p4.pixelX(), p4.pixelY());

  points.forEach(function(element) {
    element.show();
  });

  trainOne();

  fill(255);
  stroke(10);
  textSize(32);
  text("Click to train 1 iteration", 0, height);

}

function trainOne() {
  let inputs = [points[curr].x, points[curr].y, points[curr].bias];
  let target = points[curr].label;
  p.train(inputs, target);
  let guess = p.guess(inputs);
  if (guess == target)
    fill(0, 255, 0);
  else
    fill(255, 0, 0);
  noStroke();
  ellipse(points[curr].pixelX(), points[curr].pixelY(), 3, 3);
  curr = (curr + 1) % numPoints;
}

function mousePressed() {
  points.forEach(function(element) {
    let inputs = [element.x, element.y, element.bias];
    let target = element.label;
    p.train(inputs, target);
  });
}

//Activation function
function sign(n) {
  if (n >= 0)
    return 1;
  else
    return -1;
}

//construct
function Perceptron(n) {
  this.weights = [];
  this.lr = 0.01;
  //init random weights (x,y,bias)
  for (var i = 0; i < n; i++) {
    this.weights.push(random(-1, 1));
  }
}

Perceptron.prototype.guess = function(inputs) {
  let sum = 0;
  for (var i = 0; i < this.weights.length; i++) {
    sum += inputs[i] * this.weights[i];
  }
  return sign(sum);
}

Perceptron.prototype.guessY = function(input) {
  let w0 = this.weights[0];
  let w1 = this.weights[1];
  let w2 = this.weights[2];
  return -(w2 / w1) - (w0 / w1) * input;
}

Perceptron.prototype.train = function(inputs, target) {
  let guess = this.guess(inputs);
  let error = target - guess;
  for (var i = 0; i < this.weights.length; i++) {
    this.weights[i] += error * inputs[i] * this.lr;
  }
}


function Point(x, y) {
  this.x = x;
  this.y = y;
  this.bias = 1;

  this.label = y > f(this.x) ? 1 : -1;
}

Point.prototype.pixelX = function() {
  return map(this.x, -1, 1, 0, width);
}

Point.prototype.pixelY = function() {
  return map(this.y, -1, 1, height, 0);
}

Point.prototype.show = function() {
  noStroke();
  if (this.label == 1)
    fill(255);
  else {
    fill(0);
  }

  let px = this.pixelX();
  let py = this.pixelY()

  ellipse(px, py, 5, 5);
}