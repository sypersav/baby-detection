img = "";
status = "";
song ="";
objects = [];
function preload() {
 song = loadSound("iphone_alarm.mp3"); 
}
function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide()
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting baby";
}





function draw() {
  image(video, 0, 0, 380, 380);
  if (status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    
    objectDetector.detect(video, gotResult);
    document.getElementById("status").innerHTML ="objects detected"   
    for (let i = 0; i < objects.length; i++) {
      percentage = floor(objects[i].confidence *100)
        fill(r,g,b);
      text(objects[i].label + " "+ percentage + "%", objects[i].x + 15 ,objects[i].y + 12);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      if (objects[i].label != "person") {
        song.play()
        document.getElementById("status").innerHTML  = "baby not found"
      }
      else{
        document.getElementById("status").innerHTML = "baby detected"
        song.stop()
      }
    }
  }
}
function modelLoaded() {
  console.log("model loaded");
  status = true;
  
}
function gotResult(error, results) {
  if (error) {
    console.log("error");
  } else {
    console.log(results);
    objects = results;
  }
}
