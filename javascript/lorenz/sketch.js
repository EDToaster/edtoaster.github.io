function setup() {
  createCanvas(800, 600, WEBGL);
  colorMode(HSB, 255);
  lorenz = new LorenzAttractor(10, 28, 8.0 / 3.0);
  background(51);
}

let lorenz;

function draw() {
  background(51);
  lorenz.update(.02);
  lorenz.draw();
}
class LorenzAttractor {



  constructor(a, b, c) {
    this.x = 0.01;
    this.y = 0;
    this.z = 0;
    this.a = a;
    this.b = b;
    this.c = c;
    this.time = 0;
    this.points = [{
      x: this.x,
      y: this.y,
      z: this.z,
      t: 0
    }];
  }


  update(dt) {
    let dx = this.a * (this.y - this.x);
    let dy = this.x * (this.b - this.z) - this.y;
    let dz = this.x * this.y - this.c * this.z;

    this.x += dx * dt;
    this.y += dy * dt;
    this.z += dz * dt;

    this.points.push({
      x: this.x,
      y: this.y,
      z: this.z,
      t: this.time
    });

    this.time += dt;

  }

  draw() {
    scale(3);
    rotateY(this.time);

    strokeWeight(2);
    console.log(this.points.length);
    for (let i = 0; i < this.points.length - 2; i++) {
      let last = this.points[i];
      let curr = this.points[i + 1];

      stroke((curr.t) * 20 % 255, 255, 255);
      line(last.x, last.y, last.z, curr.x, curr.y, curr.z);
    }

  }
}