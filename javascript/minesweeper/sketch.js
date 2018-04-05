var field = [];
let w = 30;
let h = 30;
let size = 20;

function setup() {
  createCanvas(w * size, h * size);
  colorMode(HSB, 255);

  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      let isMine = random() < 0.2;
      field.push({
        x: i,
        y: j,
        mine: isMine,
        c: true,
        n: 0
      });
    }
  }

  neighbours();

}

function neighbours() {
  field.forEach(b => {
    let sum = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let x = b.x + i;
        let y = b.y + j;
        if (x < 0 || x >= w || y < 0 || y >= h)
          continue;

        let index = y * w + x;
        if (field[index].mine)
          sum++;
      }
    }
    b.n = sum;
  });


}

function draw() {
  background(51);
  textAlign(CENTER, CENTER);
  field.forEach(b => {
    let x = b.x * size;
    let y = b.y * size;

    if (b.c) {
      fill(51, 51, 51)
    } else if (b.mine) {
      fill(0, 255, 255);
    } else {
      fill(0, 0, 51);
    }

    rect(x, y, size, size);
    if (!b.mine && b.n > 0 && !b.c) {
      fill(0, 0, 255);
      text(b.n, x + size / 2, y + size / 2);
    }
  });

}

let firstClick = true;

function mouseClicked() {
  let block = getBlock(mouseX, mouseY);
  if (!block) return;

  uncover(block);
  firstClick = false
}

function getBlock(x, y) {
  let col = floor(x / size);
  let row = floor(y / size);
  return getBlockFromColRow(col, row);
}

function getBlockFromColRow(col, row) {
  if (!inBounds(col, row)) return;
  return field[row * w + col];
}

function uncover(block) {
  if (block.n == 0 && block.c) {
    block.c = false;
    getFourNeighbours(block).forEach(a => uncover(a));
  }

  block.c = false;
}

function getFourNeighbours(block) {
  let neighbours = [];

  let x = block.x;
  let y = block.y;

  if (inBounds(x - 1, y)) neighbours.push(getBlockFromColRow(x - 1, y));
  if (inBounds(x + 1, y)) neighbours.push(getBlockFromColRow(x + 1, y));
  if (inBounds(x, y - 1)) neighbours.push(getBlockFromColRow(x, y - 1));
  if (inBounds(x, y + 1)) neighbours.push(getBlockFromColRow(x, y + 1));
  console.log(neighbours);
  return neighbours;
}

function inBounds(col, row) {
  return !(col < 0 || col >= w || row < 0 || row >= h);
}