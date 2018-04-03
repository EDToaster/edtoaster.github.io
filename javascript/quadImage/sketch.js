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

let img;
let qt;

function preload() {
  img = loadImage("sun.jpg");
}

function setup() {
  createCanvas(200, 200);
  noSmooth();
  img.resize(200, 200);
  image(img, 0, 0, width, height);
  background(51);
  qt = new QuadTree(new Rectangle(width / 2, height / 2, width / 2, height / 2), 9, subdivide, 100, .10, false);
}

function draw() {
  background(51);
  qt.draw();
}

function mousePressed() {
  qt.passdownSubdivide();
}