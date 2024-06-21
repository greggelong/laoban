// will speech only works well with chrome
// using this cdn
// <script src="https://cdn.jsdelivr.net/gh/IDMNYU/p5.js-speech@0.0.3/lib/p5.speech.js"></script>

// another cdn I am not sure which will work in china
let off = 10; // offset for sine wave
let x; // x pos for word
let story;
let myline;
let bard;
let speakButton;
let fwd;
let bkw;
let talking = false;
let cbard;
function preload() {
  //story = loadStrings("ce_swap_instructions.txt");
  story = loadStrings("site.txt");
}

function setup() {
  createCanvas(900, 800);
  //colorMode(HSB, story.length, 100, 100);
  //textFont("Courier New", 10);
  bard = new p5.Speech(); // speech synthesis object
  cbard = new p5.Speech();
  cbard.setLang("zh-CN");
  //bard.listVoices()
  bard.onLoad = loaded;

  cbard.onLoad = loaded;
  cbard.onEnd = speakit;
  speakButton = createButton("Speak it");
  speakButton.size(100, 100);

  speakButton.mousePressed(speakit); // callback for speech
  fwd = createButton("Forward");
  fwd.size(100, 100);
  fwd.mousePressed(goForward);
  bkw = createButton("Back");
  bkw.size(100, 100);
  bkw.mousePressed(goBack);
  myline = 0;
  print(story.length);
  textAlign(LEFT, TOP);
}

function draw() {
  background(0);
  textSize(height / 15);
  text(
    (myline + 2) / 2 + " of " + (story.length - 1) / 2,
    width - 250,
    height - 50
  );
  fill(255, 0, 0);
  x = width; // to start set x at width
  let mywords = split(story[myline], " ");
  //print(mywords, myline);
  for (let i = 0; i < mywords.length; i++) {
    textSize(height - 60);
    if (x - off < 0 && i == mywords.length - 1) {
      x = width;
      off = 10;
    }
    text(mywords[i], x - off, 50);
    x += textWidth(mywords[i]);
  }
  off += 5;
}

function speakit() {
  print("hello");
  cbard.setLang("zh-CN");

  //bard.setVoice("Microsoft YaoYao - Chinese (Simplified, PRC)")

  cbard.speak(story[myline]);
  //bard.setVoice("Microsoft Mark - English (United States)")
  bard.setLang("en-US");
  bard.speak(story[myline + 1]);
}

function goBack() {
  bard.cancel();
  cbard.cancel();
  if (myline > 0) {
    myline -= 2;
    x = width;
    off = 10;
  }
}

function goForward() {
  bard.cancel();
  cbard.cancel();
  if (myline < story.length - 3) {
    myline += 2;
    x = width;
    off = 10;
  }
}

function loaded() {
  print("loaded");
  //bard.listVoices();
}
