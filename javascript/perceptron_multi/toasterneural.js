function sigmoid(x) {
  return 1.0 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
  return y * (1 - y);
}

class ToasterNeural {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.weights_ih = new Matrix(hidden_nodes, input_nodes).randomize();
    this.weights_ho = new Matrix(output_nodes, hidden_nodes).randomize();

    this.bias_h = new Matrix(this.hidden_nodes, 1).randomize();
    this.bias_o = new Matrix(this.output_nodes, 1).randomize();
    this.lr = .1;
  }

  feedforward(input_array) {

    let inputs = Matrix.fromArray(input_array);

    let hidden = Matrix.map(Matrix.dot(this.weights_ih, inputs).add(this.bias_h), sigmoid);
    //Activation
    let outputs = Matrix.map(Matrix.dot(this.weights_ho, hidden).add(this.bias_o), sigmoid);

    return outputs.toArray();
  }

  train(input_array, target_array) {
    let inputs = Matrix.fromArray(input_array);

    let hidden = Matrix.map(Matrix.dot(this.weights_ih, inputs).add(this.bias_h), sigmoid);
    //Activation
    let outputs = Matrix.map(Matrix.dot(this.weights_ho, hidden).add(this.bias_o), sigmoid);


    let targets = Matrix.fromArray(target_array);
    //calc error
    //ERROR = TARGETS - OUTPUTS
    let output_errors = Matrix.subtract(targets, outputs);

    //gradients
    let gradients = Matrix.map(outputs, dsigmoid);
    gradients.multiply(output_errors);
    gradients.multiply(this.lr);


    let hidden_T = hidden.transpose();
    let who_d = Matrix.dot(gradients, hidden_T);

    //adjust weights
    this.weights_ho.add(who_d);
    this.bias_o.add(gradients);


    let who_t = this.weights_ho.transpose();
    let hidden_errors = Matrix.dot(who_t, output_errors);

    let hidden_gradient = Matrix.map(hidden, dsigmoid);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.lr);

    let inputs_T = inputs.transpose();
    let wih_d = Matrix.dot(hidden_gradient, inputs_T);

    this.weights_ih.add(wih_d);
    this.bias_h.add(hidden_gradient);
  }
}