let sun;

function setup() {
  createCanvas(600, 600);
  sun = new Planet(50, 0, 0, .01);
  earth = new Planet(25, 0, 200, .02);
  earth.generateChild();
  sun.children.push(earth);
}

function draw() {
  background(51);
  sun.draw(0, 0);
}

class Planet {
  constructor(radius, angle, distance, da) {
    this.r = radius;
    this.a = angle;
    this.d = distance;
    this.da = da;

    this.children = [];
  }

  draw(x, y) {
    push();
    translate(width / 2, height / 2);
    noStroke();
    fill(200);
    let nx = Math.sin(this.a) * this.d + x;
    let ny = -Math.cos(this.a) * this.d + y;

    ellipse(nx, ny, this.r, this.r);
    pop();

    this.children.forEach(a => {
      a.draw(nx, ny);
    })
    this.a += this.da;
  }

  generateChild() {
    this.children.push(new Planet(this.r / 2, random(TWO_PI), this.d / 3, this.da * 3));
  }
}