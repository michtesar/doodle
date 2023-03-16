let backgroundColor
let doodleClassifier
let canvas

function setStatus(text) {
  document.getElementById("status").innerHTML = text
}

function setup() {
  canvas = createCanvas(600, 600)
  canvas.parent("canvas")
  backgroundColor = color(255, 255, 255)
  background(backgroundColor)
  doodleClassifier = ml5.imageClassifier("DoodleNet", modelReady)
}

function draw() {
  if (mouseIsPressed) {
    stroke(0)
    strokeWeight(16)
    line(mouseX, mouseY, pmouseX, pmouseY)
  }
}

function clearCanvas() {
  background(backgroundColor)
}

function modelReady() {
  doodleClassifier.classify(canvas, gotResults)
}

function gotResults(error, results) {
  if (error) {
    throw error
  }
  console.log(results[0])
  let resultsText = `${results[0].label} ${nf(
    100 * results[0].confidence,
    2,
    0
  )}%`
  setStatus(resultsText)
  doodleClassifier.classify(canvas, gotResults)
}
