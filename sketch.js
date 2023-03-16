let doodleClassifier;
let canvas;

function setStatus(text) {
  document.getElementById("status").innerHTML = text;
}

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent("canvas");
  background(255);
  doodleClassifier = ml5.imageClassifier("DoodleNet", modelReady);
}

function draw() {
  if (mouseIsPressed) {
    stroke(0);
    strokeWeight(16);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function clearCanvas() {
  background(255);
}

function modelReady() {
  doodleClassifier.classify(canvas, gotResults);
}

function formatConfidence(number) {
  return nf(100 * number, 1, 2);
}

function formatLabel(label) {
  return label.replace("_", " ");
}

function formatResults(results, n = 2) {
  let text = "";
  for (let i = 0; i < n; i++) {
    let result = results[i];
    text += `
    ${formatLabel(result.label)}
     ${formatConfidence(result.confidence)}%`;
    if (result !== n) {
      text += "<br>";
    }
  }
  return text;
}

function gotResults(error, results) {
  if (error) {
    throw error;
  }
  console.log(results[0]);
  predictions = formatResults(results, 2);
  setStatus([predictions]);
  doodleClassifier.classify(canvas, gotResults);
}
