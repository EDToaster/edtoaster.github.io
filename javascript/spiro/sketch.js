var sizes = [];

var lines;

function setup() {
  createCanvas(800, 800);

  var size = 200;
  for (var i = 0; i < 33; i++) {
    sizes.push({
      size: size,
      angle: 0
    });
    size = size / 3;
  }
  lines = createGraphics(width * res, height * res);
  lines.colorMode(HSB, 255);
}

var lastX, lastY;
var res = 10;

var fac = 1;

function mousePressed() {
  if (mouseButton === LEFT) {
    fac--;
  } else {
    fac++;
  }
}

function draw() {
  background(51);
  noFill();
  stroke(0);
  strokeWeight(.1);

  translate(-((fac - 1) / 2.0) * width, 0);
  scale(fac);

  var x = width / 2;
  var y = height / 2;
  var lastSize = -sizes[0].size;
  var angleSum = 0;

  for (let [n, element] of sizes.entries()) {
    var size = element.size;
    var angle = element.angle;
    var length = size + lastSize;

    var x1 = sin(angle) * length + x;
    var y1 = -cos(angle) * length + y;


    ellipse(x1, y1, size * 2, size * 2);


    x = x1;
    y = y1;
    lastSize = size;
    element.angle = (element.angle + delta(n)) % TWO_PI;

    if (n == sizes.length - 1) {
      if (lastX && lastY) {
        lines.stroke(map(angle, -TWO_PI, 0, 0, 255), 255, 255);
        lines.strokeWeight(1);
        lines.line(lastX * res, lastY * res, x * res, y * res);
      }

      lastX = x;
      lastY = y;

    }
  }

  image(lines, 0, 0, width, height);
}

function delta(index) {
  var k = -4;

  return radians(Math.pow(k, index - 1)) / 1000.0;
}