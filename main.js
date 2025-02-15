// Variables
let firstScreen = 0;
let gameScreen = 1;
let lastScreen = 2;
let skyBg;
let startButton;
let ball;
let x = 0;
let y = 0;
let xspeed = 5;
let yspeed = 5;
let playBall;
let obstacles = [];
let elements = [];
let movingBall;
let obImg;
let distance;
let song;
let ballSound;
let gameOverSound;
let score = 0;
let restartButton;

// Load images
function preload() {
  skyBg = loadImage("./images/sky.jpg");
  summerBg = loadImage("/images/summerBeach.jpg");
  ball = loadImage("/images/beach-ball (1).png");
  playBall = loadImage("/images/beach-ball copy.png");
  obImg = loadImage("/images/cactus.png");
  song = loadSound("/sound/magic-in-the-air-43177.mp3");
  ballSound = loadSound("/sound/mixkit-basketball-ball-hard-hit-2093.wav  ");
  gameOverSound = loadSound("/sound/mixkit-sad-game-over-trombone-471.wav");
  pointsSound = loadSound("/sound/mixkit-achievement-bell-600.wav");

  elementImg1 = loadImage("/images/watermelon.png");
  elementImg2 = loadImage("/images/cocktail.png");
  elementImg3 = loadImage("/images/flower.png");
  elementImg4 = loadImage("/images/ice-cream.png");
}

// Set up function
function setup() {
  createCanvas(1750, 960);
  // Start button
  startButton = createButton("Play game");
  startButton.position(0, 0, 100, 100);
  startButton.mousePressed(goToGameScreen);
  movingBall = new movePlayBall();
  elements.push(new Element1());
  elements.push(new Element2());
  elements.push(new Element3());
  elements.push(new Element4());
  getAudioContext().suspend();
  song.play();
  song.setVolume(0.2);
} //close Setup

//  Draw function
function draw() {
  // Background
  background(skyBg);

  // first-screen
  if (firstScreen === 0) {
    // background(bg);
    firstBall();
    userStartAudio();

    // second screen
  } else if (firstScreen === 1) {
    goToGameScreen();

    if (frameCount % 60 === 0) {
      // Create a new obstacle
      let obstacle = new Obstacle();
      obstacles.push(obstacle);
    }
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].show();
      obstacles[i].move();
    }
    // detect collision
    let collided = false;
    for (let i = 0; i < obstacles.length; i++) {
      let obstacle = obstacles[i];
      let distance = dist(movingBall.x, movingBall.y, obstacle.x, obstacle.y);
      if (distance < movingBall.r / 2 + obstacle.size / 2) {
        collided = true;
      }
    }
    if (collided) {
      // console.log('collision');
      // firstScreen = 2;
      gameover();
      goToGameScreen.hide();
    }

    // elements
    for (let i = 0; i < elements.length; i++) {
      elements[i].show();
      elements[i].move();
      if (elements[i].x < -50) {
        elements[i].x = width;
      }
    }

    // detect element collision
    let elementCollision = false;
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      let distance = dist(movingBall.x, movingBall.y, element.x, element.y);
      if (distance < movingBall.r / 2 + element.size / 2) {
        elementCollision = element;
      }
    }
    if (elementCollision && elementImg1) {
      // console.log('collision');

      pointsSound.play();
      pointsSound.setVolume(0.02);

      score += 5;
    } else if (elementCollision && elementImg2) {
      score += 5;
    } else if (elementCollision && elementImg3) {
      score += 5;
    } else if (elementCollision && elementImg4) {
      score += 5;
    }

    drawBoard();
    movingBall.show();
    movingBall.move();
    // last screen
  } else if (firstScreen === 2) {
  }
}
// close Draw
function goToGameScreen() {
  background(summerBg);
  firstScreen = gameScreen;
  if (startButton) {
    startButton.hide();
  }
  if (restartButton) {
    restartButton.hide();
  }
  let h1 = (document.getElementById("title").style.display = "none");
  song.stop();
  fill(255);
  text(" Score: " + score, 80, 100);
  textStyle(ITALIC);
  textSize(30);
}

function gameover() {
  noLoop();
  background(208, 120, 121);
  textAlign(CENTER, CENTER);
  textStyle(ITALIC);
  textSize(80);
  text("Game Over! ", width / 2, height / 3);
  textSize(30);
  text("Final Score: " + score, width / 2, height / 2);
  gameOverSound.setVolume(0.1);
  gameOverSound.play();
  restartButton = createButton("Restart");
  restartButton.position(0, 50);
  restartButton.mousePressed(resetGame);
  // resetGame();
}

function firstBall() {
  // display ball image on first-screen
  x += xspeed;
  y += yspeed;
  if (x > width - ball.width || x < 0) {
    xspeed *= -1;
  }
  if (y > height - ball.height || y < 0) {
    yspeed *= -1;
  }
  image(ball, x, y);
}

function resetGame() {
  firstScreen = 1;
  x = 0;
  y = 0;
  elements = [];
  obstacles = [];
  movingBall = new movePlayBall();
  elements.push(new Element1());
  elements.push(new Element2());
  elements.push(new Element3());
  elements.push(new Element4());
  song.playMode("restart");
  score = 0;
  loop();
}
