let files = [{
    name: "bird",
  },
  {
    name: "camera"
  },
  {
    name: "cat"
  },
  {
    name: "cello"
  },
  {
    name: "hammer"
  },
  {
    name: "saxophone"
  }
]

const training = 1400; //dataset 1600, training images PER TYPE
const filesize = 784;

function split_arr(arr, n) {
  var res = [];
  for (let i = 0; i < arr.length / n; i++) {
    res.push(arr.slice(i * n, (i + 1) * n));
  }
  return res;
}

function preload() {
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

const hidden_nodes = 64;

function setup() {
  createCanvas(800, 460);
  pimage = createImage(28, 28);
  imagearr = new Array(filesize);
  imagearr.fill(0);

  size = height / total;

  //start NN
  nn = new NeuralNetwork(filesize, hidden_nodes, files.length);
  background(0);

}

let last;
let trainings = 0;
const periter = 50;

function draw() {
  //training
  noSmooth();
  strokeWeight(16);
  stroke(255);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  train(periter);
  trainings += periter;
  last = get(0, 0, width / 2, height - 60);
  img = get(0, 0, width / 2, height - 60);
  img.resize(28, 28);
  background(0);

  image(last, 0, 0, width / 2, height - 60);
  image(img, width / 2, 0, width / 2, height - 60);
  testImage(img);

}

function testImage(img) {
  img.loadPixels();
  let data = [];
  for (let i = 0; i < img.pixels.length; i += 4) {
    data.push(img.pixels[i] / 255.0);
  }
  let guess = nn.predict(data);
  let ind = guess.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  strokeWeight(2);
  stroke(0);
  textSize(30);
  fill(255);
  text(files[ind].name, 0, height);
  text(trainings, 0, height - 30);
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