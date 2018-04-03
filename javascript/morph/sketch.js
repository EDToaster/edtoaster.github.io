function startf(theta, sides) {
  return (cos(PI / 2)) / (cos(theta % (2 * PI / 2) - PI / 2)) * 200;
}

function two(theta, sides) {
  return (cos(PI / sides)) / (cos(theta % (2 * PI / sides) - PI / sides)) * 200;
}

function toCartesian(func, theta, sides) {
  let x = func(theta, sides) * cos(theta);
  let y = func(theta, sides) * sin(theta);
  return [x, y];
}

let split = 100;
let delta;
let points = [];

let frames = 100;
let frame = 0;
let curr = 0;

let start = startf;
let targets = [two];

function target(func) {
  let sides = Math.floor(random(3, 8));

  let offset = random(0, PI);

  points.forEach(pt => {
    let theta = pt.t;
    const [x, y] = toCartesian(func, theta + offset, sides);
    pt.tx = x;
    pt.ty = y;
  });
}

function setup() {
  createCanvas(600, 600);
  frameRate(30);
  delta = TWO_PI / (split - 1);

  for (let i = 0; i < split; i++) {
    let theta = i * delta;
    const [x, y] = toCartesian(start, theta);
    points.push({
      cx: x,
      cy: y,
      t: theta
    });
  }

  target(targets[curr]);

  background(51);
}

function draw() {
  translate(width / 2, height / 2);
  strokeWeight(1);
  noFill();
  stroke(200);
  background(51, 51, 51);

  beginShape();
  points.forEach(p => {
    curveVertex(p.cx, p.cy);
    p.cx = lerp(p.cx, p.tx, random(0.04, 0.06));
    p.cy = lerp(p.cy, p.ty, random(0.04, 0.06));
  })
  endShape();
  frame++;
  if (frame >= frames) {
    frame = 0;
    curr = (curr + 1) % targets.length;
    target(targets[curr]);
  }
}