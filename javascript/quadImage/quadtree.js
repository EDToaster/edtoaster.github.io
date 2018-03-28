class Rectangle {
  constructor(x, y, w, h, col) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.col = col;
    this.area = w * h * 4;
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
    fill(this.col);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w * 2, this.h * 2);
  }

  Left() {
    return Math.floor(this.x - this.w);
  }

  Right() {
    return Math.floor(this.x + this.w);
  }

  Top() {
    return Math.floor(this.y - this.h);
  }

  Bottom() {
    return Math.floor(this.y + this.h);
  }
}

class QuadTree {
  constructor(boundary, depth, queryPixels, error, threshold) {
    this.boundary = boundary;
    this.depth = depth;
    this.queryPixels = queryPixels;
    this.error = error;
    this.threshold = threshold;

    console.log("created");
    this.subdivide();
  }


  shouldSplit() {
    return this.queryPixels(this.boundary, this.error, this.threshold);
  }

  subdivide() {
    let sp = this.shouldSplit();
    this.boundary.col = sp[1];

    if (this.depth - 1 <= 0) {
      //depth reached, do not subdivide
      return;
    }

    if (!sp[0]) {
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

    this.nw = new QuadTree(nw, this.depth - 1, this.queryPixels, this.error, this.threshold);
    this.ne = new QuadTree(ne, this.depth - 1, this.queryPixels, this.error, this.threshold);
    this.se = new QuadTree(se, this.depth - 1, this.queryPixels, this.error, this.threshold);
    this.sw = new QuadTree(sw, this.depth - 1, this.queryPixels, this.error, this.threshold);
  }

  draw() {
    if (!this.nw) {
      this.boundary.draw();
    } else {
      this.nw.draw();
      this.ne.draw();
      this.sw.draw();
      this.se.draw();
    }
  }
}