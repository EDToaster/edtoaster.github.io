var training = [
{
	lang: "dutch"
},
{
	lang: "english"
},
{
	lang: "esperanto"
},
{
	lang: "french"
},
{
	lang: "german"
},
{
	lang: "japanese"
},
{
	lang: "key"
},
{
	lang: "lojban"
},
{
	lang: "mandarin"
},
{
	lang: "polish"
},
{
	lang: "random"
},
{
	lang: "spanish"
},
{
	lang: "swahili"
}];

let font;

function preload(){
  	font = loadFont("data/Anonymous.ttf");
	
	for(let i = 0; i < training.length; i++){
		let str = training[i];
		
		let filename = "data/" + str.lang + ".txt";
		let result = Array(training.length).fill(0);
		result[i] = 1;
		this.result = result;
		
		str.__proto__.inject = function(string){
			str.data = string[0].split(',');
		}
		
		console.log("Now loading", filename);
		loadStrings(filename, str.inject);
	}

}

var nn;

function setup() {
	createCanvas(600,600);
	nn = new NeuralNetwork(lengthcap * 26, 100, training.length);
}


function draw() {
	background(51);
	
	stroke(255);
	fill(255);
	
	if(doTrain){
		for(let i=0; i < 100; i++){
			let category = random(training);
			let train = random(category.data);
			
			let data = getDataFromString(train);
			let target = category.result;
			
			nn.train(data, target);
		}
	}
	
	let guesses = nn.predict(getDataFromString(input));
	let mappedguess = [];
	
	for (let i = 0; i < guesses.length; i++) {
    		mappedguess.push({
      			label: training[i].lang,
      			value: guesses[i]
    		});
  	}
	
	mappedguess.sort(function(a, b) {
    		return b.value - a.value;
  	});
  
  	textFont(font);
  	textSize(30);
	textAlign(LEFT, TOP);
	text(mappedguess[0].label, 0, 0 );
  	
}

let doTrain = false;

function mousePressed(){
	doTrain = !doTrain;
}

var input = "";
const lengthcap = 15;

function keyTyped(){
	if(keyCode > 96 && keyCode < 123)
		input += key.toUpperCase();

	if(input.length >= lengthcap)
		input = input.substring(0, lengthcap);
	
	
	if(keyCode === RETURN)
		input = "";
}

function getDataFromString(string){
	let result = Array(lengthcap * 26).fill(0);

	for (var i = 0; i < string.length; i++) {
  		let num = string.substring(0, lengthcap).toUpperCase().charCodeAt(i);
		let index = i * 26 + num - 65;
		result[index] = 1;
	}
	return result;
}
