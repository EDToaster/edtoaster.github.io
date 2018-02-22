var g = 9.8;
var dt = 0.02;

function DblPen(theta1, theta2, length1, length2, mass1, mass2) {
  var l1 = length1;
  var l2 = length2;
  var m1 = mass1;
  var m2 = mass2;
  this.theta1 = theta1;
  this.theta2 = theta2;
  this.w1 = 0;
  this.w2 = 0;
  this.dw1 = 0;
  this.dw2 = 0;
  this.x1 = l1 * cos(this.theta1);
  this.y1 = l1 * sin(this.theta1);
  this.x2 = this.x1 + l2 * cos(this.theta2);
  this.y2 = this.y1 + l2 * sin(this.theta2);
  this.f = [];
  this.f[0] = function(a, b, c, d) {
    return c;
  }
  this.f[1] = function(a, b, c, d) {
    return d;
  }
  this.f[2] = function(a, b, c, d) {
    return (-1 * g * (2 * m1 + m2) * sin(a) - m2 * g * sin(a - 2 * b) - 2 * sin(a - b) * m2 * (sq(d) * l2 + sq(c) * l1 * cos(a - b))) / (l1 * (2 * m1 + m2 - m2 * cos(2 * a - 2 * b)))
  };
  this.f[3] = function(a, b, c, d) {
    return (2 * sin(a - b) * (sq(c) * l1 * (m1 + m2) + g * (m1 + m2) * cos(a) + sq(d) * l2 * m2 * cos(a - b))) / (l2 * (2 * m1 + m2 - m2 * cos(2 * a - 2 * b)))
  };
  this.X = [this.theta1, this.theta2, this.w1, this.w2];

  this.update = function() {

    for (var i = 0; i < 5; i++) {
      this.X = RK4(this.f, this.X, dt);
    }
    this.x1 = l1 * cos(this.X[0]);
    this.y1 = l1 * sin(this.X[0]);
    this.x2 = this.x1 + l2 * cos(this.X[1]);
    this.y2 = this.y1 + l2 * sin(this.X[1]);
  }

  this.getColor = function() {
    let angle = atan2(this.y2, this.x2) + PI;

    return color(angle, 255, 255);
  }

  this.display = function(offsetX, offsetY, boundsX, boundsY) {
    strokeWeight(1);
    push();
    translate(offsetX, offsetY);
    translate(boundsX / 2, boundsY / 2);
    rotate(HALF_PI);
    scale(min(boundsX, boundsY) / parseFloat(length1 + length2) / 2);
    let col = this.getColor();
    stroke(col);
    line(0, 0, this.x1, this.y1);
    stroke(col);
    line(this.x1, this.y1, this.x2, this.y2);
    pop();
  }
}