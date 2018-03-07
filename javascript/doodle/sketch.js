let files = [{
  name: "alarm clock"
}, {
  name: "axe"
}, {
  name: "banana"
}, {
  name: "bird"
}, {
  name: "blank"
}, {
  name: "bottlecap"
}, {
  name: "bracelet"
}, {
  name: "bucket"
}, {
  name: "bus"
}, {
  name: "cactus"
}, {
  name: "camera"
}, {
  name: "cat"
}, {
  name: "cello"
}, {
  name: "chair"
}, {
  name: "clock"
}, {
  name: "coffee cup"
}, {
  name: "cup"
}, {
  name: "fireplace"
}, {
  name: "fish"
}, {
  name: "flashlight"
}, {
  name: "foot"
}, {
  name: "fork"
}, {
  name: "hammer"
}, {
  name: "helicopter"
}, {
  name: "hexagon"
}, {
  name: "knee"
}, {
  name: "moon"
}, {
  name: "mouse"
}, {
  name: "rain"
}, {
  name: "river"
}, {
  name: "sailboat"
}, {
  name: "saxophone"
}, {
  name: "sun"
}, {
  name: "The Eiffel Tower"
}, {
  name: "The Mona Lisa"
}, {
  name: "toilet"
}]

const training = 10000; //dataset 1600, training images PER TYPE
const filesize = 784;

function split_arr(arr, n) {
  var res = [];
  for (let i = 0; i < arr.length / n; i++) {
    res.push(arr.slice(i * n, (i + 1) * n));
  }
  return res;
}
var font;

function preload() {
  font = loadFont("data/Anonymous.ttf");

  for (let i = 0; i < files.length; i++) {
    let e = files[i];

    e.target = new Array(files.length);
    e.target.fill(0, 0, files.length);
    e.target[i] = 1;
    e.id = i;

    e.__proto__.inject = function(data) {
      let train = data.bytes.subarray(0, filesize * training);
      let test = data.bytes.subarray(filesize * training, data.length);

      e.training = split_arr(train, filesize);
      e.testing = split_arr(test, filesize);
    }

    loadBytes("data/" + e.name + ".bin", e.inject);
  }
}

let ind = 0;
const total = 20;
let size;
let nn;

let hidden_nodes;
const def_nodes = 100;

function setup() {
  createCanvas(1200, 460);
  pimage = createImage(28, 28);
  imagearr = new Array(filesize);
  imagearr.fill(0);

  let val = parseInt(getfromname('n'));
  hidden_nodes = val ? (val < 1 ? def_nodes : val) : def_nodes;

  size = height / total;
  last = createGraphics(400, 400);
  last.background(0);

  //start NN
  nn = new NeuralNetwork(filesize, hidden_nodes, files.length);
  background(0);

}

let last;
let trainings = 0;
const periter = 50;

let dotrain = false;

function draw() {
  //training
  background(0);
  noSmooth();
  last.strokeWeight(16);
  last.stroke(255);
  if (mouseIsPressed) {
    if (mouseButton == LEFT)
      last.line(pmouseX, pmouseY, mouseX, mouseY);
  }
  if (dotrain) {
    train(periter);
    trainings += periter;
  }
  img = last.get();
  img.resize(28, 28);

  image(last, 0, 0, width / 3, height - 60);
  image(img, width / 3, 0, width / 3, height - 60);
  testImage(img);

}

function mousePressed() {
  if (mouseButton == CENTER) {
    last.background(0);
  } else if (mouseButton == RIGHT) {
    dotrain = !dotrain;
  }
}

function testImage(img) {
  img.loadPixels();
  let data = [];
  for (let i = 0; i < img.pixels.length; i += 4) {
    data.push(img.pixels[i] / 255.0);
  }
  let guesses = nn.predict(data);
  let mappedguess = [];
  for (let i = 0; i < guesses.length; i++) {
    mappedguess.push({
      label: files[i].name,
      value: guesses[i]
    });
  }

  mappedguess.sort(function(a, b) {
    return b.value - a.value;
  });

  strokeWeight(2);
  stroke(0);
  textFont(font);
  textSize(30);
  fill(255);
  text(mappedguess[0].label, 0, height);
  text(trainings + ": " + hidden_nodes, 0, height - 30);

  for (let i = 0; i < 10; i++) {
    textSize(10);
    text(mappedguess[i].label.padEnd(30) + ": " + mappedguess[i].value, width / 3 * 2, 30 * (i + 1));
  }
}

function test(n) {
  let epoch = n;
  let count = 0.0;
  for (let i = 0; i < epoch; i++) {
    let e = random(files);

    //Convert to normal un-typed array and normalize each value
    let data = Array.prototype.slice.call(random(e.training)).map(a => a / 255.0);
    let id = e.id;

    let guess = nn.predict(data);
    let ind = guess.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
    if (ind === id)
      count++;
  }
  return count / epoch;
}

function train(n) {
  let epoch = n;
  for (let i = 0; i < epoch; i++) {
    let e = random(files);

    //Convert to normal un-typed array and normalize each value
    let data = Array.prototype.slice.call(random(e.training)).map(a => a / 255.0);
    let target = e.target;
    nn.train(data, target);
  }
}

function getfromname(name) {
  if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
    return decodeURIComponent(name[1]);
}
document.oncontextmenu = function() {
  return false;
}