var board = [];
var cellHeight, cellWidth;

var boardSize = 4;
var score = 0;
var lostGame = false;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 255);
  for (let i = 0; i < boardSize * boardSize; i++) {
    let x = i % boardSize;
    let y = i / boardSize;
    board.push({
      x: x,
      y: Math.floor(y),
      val: 0
    });
  }

  cellHeight = height / boardSize;
  cellWidth = width / boardSize;


  spawn();
  spawn();
}

function keyPressed() {
  if (lostGame)
    return;
  switch (keyCode) {
    case 87:
    case UP_ARROW:
      if (!moveUp())
        break;
      spawn();
      return;
    case 65:
    case LEFT_ARROW:
      if (!moveLeft())
        break;
      spawn();
      return;
    case 83:
    case DOWN_ARROW:
      if (!moveDown())
        break;
      spawn();
      return;
    case 68:
    case RIGHT_ARROW:
      if (!moveRight())
        break;
      spawn();
      return;
    default:
      return;
  }
  console.log("illegal move");
}

function draw() {
  background(51);

  textAlign(CENTER, CENTER);
  textSize(50);
  board.forEach(e => {
    let fillVar = map(Math.log(e.val) / Math.log(2), 0, 11, 120, 255);

    fill(19, fillVar, 255);
    rect(e.x * cellWidth, e.y * cellHeight, (e.x + 1) * cellWidth, (e.y + 1) * cellHeight);
    fill(255);
    text(e.val, (e.x + 0.5) * cellWidth, (e.y + 0.5) * cellHeight);
  })
  grid();
}

function grid() {
  deltaX = width / boardSize;
  deltaY = height / boardSize;
  stroke(200);
  strokeWeight(5);

  for (var i = 0; i <= boardSize; i++) {
    line(i * deltaX, 0, i * deltaX, height);
    line(0, i * deltaY, width, i * deltaY);
  }
}

function spawn() {
  let picker = board.filter(e => !e.val);
  let cell = random(picker);
  if (!cell) {
    lost();
  } else {
    cell.val = random(1) > 0.5 ? 2 : 4;
  }
}

function moveUp() {
  let processed = false;
  for (let x = 0; x < boardSize; x++) {
    let column = board.filter(e => e.x == x);
    if (execute(column))
      processed = true;
    combine(column);
  }
  return processed;
}

function moveDown() {
  let processed = false;
  for (let x = 0; x < boardSize; x++) {
    let column = board.filter(e => e.x == x).reverse();
    if (execute(column))
      processed = true;
    combine(column);
  }
  return processed;
}

function moveLeft() {

  let processed = false;
  for (let y = 0; y < boardSize; y++) {
    let column = board.filter(e => e.y == y);
    if (execute(column))
      processed = true;
    combine(column);
  }
  return processed;
}

function moveRight() {

  let processed = false;
  for (let y = 0; y < boardSize; y++) {
    let column = board.filter(e => e.y == y).reverse();
    if (execute(column))
      processed = true;
    combine(column);
  }
  return processed;
}

function execute(column) {
  let processed = false;
  while (process(column)) {
    processed = true;
  }
  return processed;
}

function process(arr) {
  let swaps = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].val != 0) {
      for (let b = i - 1; b >= 0; b--) {
        if (arr[b].val == 0) {
          swaps++;
          arr[b].val = arr[i].val;
          arr[i].val = 0;
        }
      }
    }
  }
  return swaps;
}

function combine(arr) {
  for (let i = 0; i < boardSize - 1; i++) {
    if (arr[i].val == arr[i + 1].val) {
      //combine
      score += arr[i].val;
      console.log(score);
      arr[i].val = arr[i + 1].val * 2;
      arr[i + 1].val = 0;
    }
  }
  while (process(arr));
}

function lost() {
  console.log("Final score: " + score);
  lostGame = true;
  noLoop();
}