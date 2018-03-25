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
  constructor(boundary, cap) {
    this.boundary = boundary;
    this.cap = cap;
    this.points = [];
  }

  insert(point) {
    if (!this.boundary.contains(point))
      return;

    if (this.points && this.points.length < this.cap) {
      this.points.push(point);
    } else {
      // subdivided or is over cap

      if (this.points) {
        //has not subdivided
        this.subdivide();
      }
      //insert to children
      this.ne.insert(point);
      this.nw.insert(point);
      this.se.insert(point);
      this.sw.insert(point);
    }
  }

  subdivide() {
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

    this.nw = new QuadTree(nw, this.cap);
    this.ne = new QuadTree(ne, this.cap);
    this.se = new QuadTree(se, this.cap);
    this.sw = new QuadTree(sw, this.cap);

    let points = this.points;
    let self = this;

    this.points = 0;

    points.forEach(function(e) {
      self.insert(e);
    });

  }

  numPoints() {
    if (this.points)
      return this.points.length;
    else {
      return this.nw.numPoints() +
        this.ne.numPoints() +
        this.sw.numPoints() +
        this.se.numPoints();
    }
  }

  updateColours(bounds) {
    if (!this.points) {
      this.nw.updateColours(bounds);
      this.ne.updateColours(bounds);
      this.sw.updateColours(bounds);
      this.se.updateColours(bounds);
    } else {
      if (!this.boundary.intersects(bounds)) {
        this.boundary.col = color(255, 255, 255);
        return;
      } else {
        this.boundary.col = color(150, 255, 255);
      }
    }
  }

  findPoints(bound) {
    if (!this.boundary.intersects(bound))
      return [];
    let found = [];
    if (this.points) {
      this.points.forEach(e => {
        if (bound.contains(e))
          found.push(e);
      })
    } else {
      found.push(...this.nw.findPoints(bound));
      found.push(...this.ne.findPoints(bound));
      found.push(...this.sw.findPoints(bound));
      found.push(...this.se.findPoints(bound));
    }
    return found;
  }

  draw() {
    if (this.points) {
      this.boundary.draw();

      //shallow draw
      this.points.forEach(e => {
        e.draw();
      });
    } else {
      this.nw.draw();
      this.ne.draw();
      this.sw.draw();
      this.se.draw();
    }
  }
}