class Rectangle {
  constructor(x, y, w, h, col) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = col;
  }

  contains(point) {
    return this.x - this.w <= point.x &&
      this.y - this.h <= point.y &&
      this.x + this.w > point.x &&
      this.y + this.h > point.y;
  }

  intersects(other) {
    let a1 = this.Left() > other.Right();
    let a2 = this.Right() < other.Left();
    let a3 = this.Top() > other.Bottom();
    let a4 = this.Bottom() < other.Top();

    return !(a1 || a2 || a3 || a4);
  }

  draw() {
    strokeWeight(1);
    stroke(this.col);
    // fill(this.col);
    noFill();
    rectMode(CENTER);
    rect(this.x, this.y, this.w * 2, this.h * 2);
  }

  Left() {
    return this.x - this.w;
  }

  Right() {
    return this.x + this.w;
  }

  Top() {
    return this.y - this.h;
  }

  Bottom() {
    return this.y + this.h;
  }
}

class Point {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
  }

  draw(col) {

    strokeWeight(3);

    if (col)
      stroke(col);
    else
      stroke(this.col);

    point(this.x, this.y);
  }
}

class QuadTree {
  constructor(boundary, cap, depth, splitFunction, res) {
    this.boundary = boundary;
    this.cap = cap;
    this.depth = depth;
    this.splitFunction = splitFunction;

    this.resolution = res;
    this.filled = splitFunction(this.boundary.x) >= this.boundary.y;
    this.subdivide();
  }


  overlaps() {

    let dx = this.boundary.w * 2 / this.resolution;

    for (let i = 0; i < this.resolution; i++) {

      let x = (i - this.resolution / 2) * dx + this.boundary.x;
      let y = this.splitFunction(x);
      if (this.boundary.contains(new Point(x, y)))
        return true;
    }
    return false;
  }

  subdivide() {
    if (this.depth - 1 <= 0) {
      //depth reached, do not subdivide
      return;
    }

    if (!this.overlaps()) {
      return;
    }

    let hw = this.boundary.w / 2;
    let hh = this.boundary.h / 2;

    let nw = new Rectangle(
      this.boundary.x - hw,
      this.boundary.y - hh,
      hw, hh, this.boundary.col
    );

    let ne = new Rectangle(
      this.boundary.x + hw,
      this.boundary.y - hh,
      hw, hh, this.boundary.col
    );

    let se = new Rectangle(
      this.boundary.x + hw,
      this.boundary.y + hh,
      hw, hh, this.boundary.col
    );

    let sw = new Rectangle(
      this.boundary.x - hw,
      this.boundary.y + hh,
      hw, hh, this.boundary.col
    );

    this.nw = new QuadTree(nw, this.cap, this.depth - 1, this.splitFunction, this.resolution);
    this.ne = new QuadTree(ne, this.cap, this.depth - 1, this.splitFunction, this.resolution);
    this.se = new QuadTree(se, this.cap, this.depth - 1, this.splitFunction, this.resolution);
    this.sw = new QuadTree(sw, this.cap, this.depth - 1, this.splitFunction, this.resolution);
  }

  draw() {
    if (!this.nw) {
      if (this.filled) {
        this.boundary.col = color(100, 255, 255);
      } else {
        this.boundary.col = color(200, 255, 255);
      }
      this.boundary.draw();
    } else {
      this.nw.draw();
      this.ne.draw();
      this.sw.draw();
      this.se.draw();
    }
  }
}