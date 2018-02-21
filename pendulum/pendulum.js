let plotw = 50;
let ploth = 50;
let arr = [];
let factor = 10;

let upf = 1;

let curr = null;

let coordX1 = 0;
let coordY1 = 0;

function setup() {
  var canvas = createCanvas(plotw * factor * 2, ploth * factor);

  let delta1 = TWO_PI / plotw;
  let delta2 = TWO_PI / ploth;

  for (var i = 0; i < plotw; i++) {
    for (var j = 0; j < ploth; j++) {
      arr[j * plotw + i] = new DblPen(delta1 * i, delta2 * j, 170, 100, 200, 100);
    }
  }

}

function draw() {
  background(51);
  colorMode(HSB, TWO_PI, 255, 255);

  for (var i = 0; i < plotw; i++) {
    for (var j = 0; j < ploth; j++) {
      for (var k = 0; k < upf; k++)
        arr[j * plotw + i].update();
      let col = arr[j * plotw + i].getColor()
      stroke(col)
      fill(col)
      rect(i * factor, j * factor, factor, factor);
    }
  }


  if (curr != null) {
    curr.display(width / 2, 0, width / 2, height);

    noFill();
    stroke(0);
    strokeWeight(factor / 5);
    rect(coordX1 * factor, coordY1 * factor, factor, factor);
  }

}

function mousePressed() {
  let i = floor(mouseX / factor);
  let j = floor(mouseY / factor);
  if (i < 0 || j < 0 || i >= plotw || j >= ploth) {
    return;
  } else {
    coordX1 = i;
    coordY1 = j;
    curr = arr[coordY1 * plotw + coordX1];
  }
}