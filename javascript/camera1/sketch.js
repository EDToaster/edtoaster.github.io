var video;
var slider;

function setup() {
  let canvas = createCanvas(800, 600, WEBGL);
  background(51);
  canvas.id("p5target");

  colorMode(HSB, 255);
  video = createCapture(VIDEO);
  video.id("p5video");
  video.hide();

  var seriously = new Seriously();

  var src = seriously.source("#p5video");
  var target = seriously.target("#p5target");

  var effect1 = seriously.effect("edge");

  chain(src, [effect1], target);

  seriously.go();
}

function chain(src, effects, target) {
  let first = effects[0];
  first.source = src;

  let prev = first;
  for (let i = 1; i < effects.length; i++) {
    let effect = effects[i];
    effect.source = prev;
    prev = effect;
  }

  let last = effects[effects.length - 1];
  target.source = last;
}