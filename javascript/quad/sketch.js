var qt;
var qbound;
var qbound1;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 255);
  let bound = new Rectangle(
    width / 2,
    height / 2,
    width / 2,
    height / 2,
    color(255, 0, 255));

  qt = new QuadTree(bound, 20);

  qbound = new Rectangle(255, 364, 109, 92, color(60, 255, 255));

}


function draw() {
  background(51);
  // qt.updateColours(qbound);
  let found = qt.findPoints(qbound);
  qt.draw();
  found.forEach(e => {
    e.draw(color(100, 255, 255))
  });
  qbound.draw();
  textAlign(LEFT, TOP);
  text(frameRate(), 0, 0);
}

function mousePressed() {
  mouseDragged();
}

function mouseDragged() {
  for (let i = 0; i < 5; i++) {
    let p = new Point(randomGaussian(mouseX, 20), randomGaussian(mouseY, 20), color(20, 255, 255));
    qt.insert(p);
  }
}

function mouseMoved() {
  this.qbound.x = mouseX;
  this.qbound.y = mouseY;
}