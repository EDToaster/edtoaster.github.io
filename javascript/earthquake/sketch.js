function setup() {
  createCanvas(600, 600, WEBGL);
  frameRate(30);
  textureImg = loadImage("earth.jpg");
}

let time = 0;
let textureImg;

let latm = -37.8136,
  lngm = 155.9631;
let latn = -36.848461,
  lngn = 174.763336;

function draw() {
  background(51);
  rotateY(time);
  time += .03;

  noStroke();
  texture(textureImg);
  sphere(200);
  let coordsm = getCoords(latm, lngm, 200);
  let coordsn = getCoords(latn, lngn, 200);

  push();
  translate(coordsm.x, coordsm.y, coordsm.z);
  fill(100)
  sphere(10);
  pop();
  push();
  fill(200)
  translate(coordsn.x, coordsn.y, coordsn.z);
  sphere(10);
  pop();
}

function getCoords(lat, lng, r) {
  let t = radians(lat) + PI / 2;
  let p = radians(lng) + PI;


  let x = r * Math.sin(t) * Math.cos(p);
  let y = -r * Math.sin(t) * Math.sin(p);
  let z = r * Math.cos(t);

  return {
    x: x,
    y: y,
    z: z
  };
}