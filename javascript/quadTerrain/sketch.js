var qt;
let offsetX = 0;
let offsetY = 0;

function terrainHeight(pixel) {
  return (noise((pixel + offsetX) / 200) + .5) * height / 2 + offsetY;
}

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 255);


  // stroke(200);
  // beginShape();
  // noFill();
  // for (let i = 0; i < width / resolution; i++) {
  //   let pixel = resolution * i;
  //   vertex(pixel, terrainHeight(pixel));
  // }
  // endShape();
}

let resolution = 1;

function draw() {
  offsetX += 2;
  let bound = new Rectangle(
    width / 2,
    height / 2,
    width / 2,
    height / 2,
    color(255, 0, 255));
  qt = new QuadTree(bound, 20, 8, terrainHeight, 100);
  qt.subdivide();

  background(51);
  qt.draw();

}

// function mouseMoved() {
//   offsetX = -mouseX;
//   offsetY = mouseY;
// }