var points = []
var mult = 0.002
let ft = 120
let myColors = ["#001052", "#0D0C31", "#00003D"];
let myColors2 = ["#192773", "#0E24DC", "#485AFF", "#0A99E7"];
let myColors3 = ["white"];
let colore
let colore2
let colore3

var song

function preload() {
  song = loadSound("waves.mp3");
}


function setup() {

  song.play()
  createCanvas(windowWidth, windowHeight);


  colore = random(myColors);
  colore2 = random(myColors2);
  colore3 = random(myColors3);

  background(colore);

  angleMode(DEGREES)
  noiseDetail(1)

  var density = 103
  var space = width / density

  for (var x = 0; x < width; x += space) {
    for (var y = 0; y < height; y += space) {
      var p = createVector(x + random(-10, 10), y + random(-10, 10))
      points.push(p)
    }
  }

}

function draw() {

  for (var k = 0; k < 2; k++) {


    if ((Math.floor(frameCount / ft)) % 2 == 0) {
      myColor = lerpColor(color(colore2), color(colore3), (frameCount % ft) / ft);
    } else {
      myColor = lerpColor(color(colore3), color(colore2), (frameCount % ft) / ft);
    }

    stroke(myColor)
    strokeWeight(12)

    for (var i = 0; i < points.length; i++) {


      var angle = map(noise(points[i].x * mult, points[i].y * mult), 0,
        1, 50, 720)


      points[i].add(createVector(cos(angle), sin(angle)))


      if (dist(width / 2, height / 2, points[i].x, points[i].y) < 350) {
        ellipse(points[i].x, points[i].y, 1)

      }
    }



  }
}

function doubleClicked() {
  saveCanvas("flowfield", "png")
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause()
  } else {
    song.play()
  }
}