let boardSize = 20;
let cellSize;

let snake = [];
let fruit;
let dir = 0;

function setup() {
  createCanvas(400, 400);
  frameRate(6);
  cellSize = width / boardSize;
  snake.push({
    x: Math.floor(boardSize / 2),
    y: Math.floor(boardSize / 2)
  });
  spawnFruit();
}

let popNext = true;
let score = 0;

function draw() {
  background(51);

  let first = true;
  noStroke();
  snake.forEach(e => {
    if (first) {
      fill(255, 0, 0);
      first = false;
    } else {
      fill(255);
    }
    push();
    translate(e.x * cellSize, e.y * cellSize);
    rect(0, 0, cellSize, cellSize);
    pop();
  })
  push();
  fill(0, 255, 0);
  translate(fruit.x * cellSize, fruit.y * cellSize);
  rect(0, 0, cellSize, cellSize);
  pop();

  let dx = dir == 1 ? 1 : (dir == 3 ? -1 : 0);
  let dy = dir == 2 ? 1 : (dir == 0 ? -1 : 0);

  snake.splice(0, 0, {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  });

  if (popNext) {
    console.log(popNext)
    snake.pop();
  }

  popNext = true;

  if (snake[0].x == fruit.x && snake[0].y == fruit.y) {
    score++;
    popNext = false;
    console.log(score);
    spawnFruit();
  }

  strokeWeight(4);
  stroke(140);

  for (let i = 0; i <= boardSize; i++) {
    line(i * cellSize, 0, i * cellSize, height);
    line(0, i * cellSize, width, i * cellSize);
  }

}

function spawnFruit() {
  let x, y;
  while (true) {
    x = Math.floor(random(boardSize));
    y = Math.floor(random(boardSize));
    if (snake.filter(e => (e.x == x || e.y == y)).length == 0)
      break;
  }
  fruit = {
    x: x,
    y: y
  };

}

function keyPressed() {
  switch (key) {
    case 'W':
      if (dir == 2)
        break;
      dir = 0;
      break;
    case 'A':
      if (dir == 1)
        break;
      dir = 3;
      break;
    case 'S':
      if (dir == 0)
        break;
      dir = 2;
      break;
    case 'D':
      if (dir == 3)
        break;
      dir = 1;
      break;
  }
}