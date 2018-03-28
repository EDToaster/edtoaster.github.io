let offsetX = 0;
let offsetY = 0;

function subdivide(bounds, error, threshold) {
  if (!img)
    return;


  let factor = 4;

  let sx = bounds.Left();
  let sy = bounds.Top();
  let ex = bounds.Right();
  let ey = bounds.Bottom();

  let subpixels = [];

  img.loadPixels();
  let pixels = img.pixels;

  for (let i = sx; i < ex; i++) {
    for (let j = sy; j < ey; j++) {
      let index = (j * img.width + i) * 4;
      subpixels.push({
        r: pixels[index],
        g: pixels[index + 1],
        b: pixels[index + 2]
      });
    }
  }
  img.updatePixels();

  let sumr = 0;
  let sumg = 0;
  let sumb = 0;

  subpixels.forEach(a => {
    sumr += a.r / 255.0;
    sumg += a.g / 255.0;
    sumb += a.b / 255.0;
  });

  let averager = (sumr / subpixels.length) * 255;
  let averageg = (sumg / subpixels.length) * 255;
  let averageb = (sumb / subpixels.length) * 255;

  let amount = 0;


  subpixels.forEach(a => {
    let dist = (a.r - averager) * (a.r - averager) +
      (a.g - averageg) * (a.g - averageg) +
      (a.b - averageb) * (a.b - averageb);
    if (dist > error)
      amount++;
  });

  return [amount >= threshold * bounds.area, color(averager, averageg, averageb)];
}

let c;
let img;
let bound;
let qt;

function preload() {
  img = loadImage("earth.jpg");
}

function setup() {
  createCanvas(200, 200);
  img.resize(200, 200);
  qt = new QuadTree(new Rectangle(width / 2, height / 2, width / 2, height / 2), 10, subdivide, 1, .001);
  image(img, 0, 0, width, height);
  // console.log(subdivide(bound, 200, .01));
}

function draw() {
  image(img, 0, 0, width, height);
  qt.draw();
  noLoop();
}