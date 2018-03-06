let nn;
let lr;

let training_data = [{
    inputs: [0, 0],
    outputs: [0]
  },
  {
    inputs: [0, 1],
    outputs: [1]
  },
  {
    inputs: [1, 0],
    outputs: [1]
  },
  {
    inputs: [1, 1],
    outputs: [0]
  }
];


function setup() {
  createCanvas(600, 600);
  nn = new NeuralNetwork(2, 10, 1);
  nn.setLearningRate(.1);
}

function draw() {
  background(51);
  noStroke();

  for (let i = 0; i < 1000; i++) {
    let data = random(training_data);
    nn.train(data.inputs, data.outputs);
  }
  let resolution = 10;
  let cols = width / resolution;
  let rows = height / resolution;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      fill(nn.predict([x1, x2]) * 255);

      rect(i * resolution, j * resolution, resolution, resolution);
    }
  }

}