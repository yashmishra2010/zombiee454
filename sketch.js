var bg, bgImg;
var shooterimg, shooter;
var heart1img, heart2img, heart3img;
var heart1, heart2, heart3;
var zombie, zombieimg, zombieGroup;
var bulletsGroup;
var score = 0;
var gameState = "play";
var level = 1;
var zombieSpeed = -10;

function preload() {
  shooterimg = loadImage("assets/hunter.png");
  zombieimg = loadImage("assets/zombie.png");
  heart1img = loadImage("assets/heart_1.png");
  heart2img = loadImage("assets/heart_2.png");
  heart3img = loadImage("assets/heart_3.png");
  bgImg = loadImage("assets/background_image.jpg");
  bullet = loadImage("assets/bulletimg.png");
}

function setup() {
  createCanvas(1000, 500);

  shooter = createSprite(240, 400, 20, 20);
  shooter.scale = 0.3;
  shooter.addImage(shooterimg);

  heart1 = createSprite(800, 100, 10, 10);
  heart1.addImage(heart1img);
  heart1.scale = 0.2;

  heart2 = createSprite(820, 100, 10, 10);
  heart2.addImage(heart2img);
  heart2.scale = 0.2;

  heart3 = createSprite(840, 100, 10, 10);
  heart3.addImage(heart3img);
  heart3.scale = 0.2;

  zombieGroup = new Group();
  bulletsGroup = new Group();
}

function draw() {
  background(bgImg);
  textSize(20);
  text("SCORE: " + score, 150, 80);

  if (gameState === "play") {
    if (keyDown("space")) {
      shootBullet();
    }

    spawnZombies();

    if (zombieGroup.isTouching(bulletsGroup)) {
      zombieGroup[0].remove();
      score += 1;
    }

    if (zombieGroup.isTouching(shooter)) {
      heart3.visible = false;
      gameState = "end";
    }

    if (score >= 10 && level === 1) {
      level = 2;
      zombieSpeed = -15; // Increase zombie speed for the next level
      spawnMoreZombies();
    }

    drawSprites();
  }

  if (gameState === "end") {
    textSize(50);
    fill("red");
    text("Game Over", 400, 250);
  }
}

function spawnZombies() {
  if (frameCount % 60 === 0) {
    zombie = createSprite(1000, 400, 20, 20);
    zombie.addImage(zombieimg);
    zombie.scale = 0.2;
    zombie.velocityX = zombieSpeed;
    zombieGroup.add(zombie);
  }
}

function spawnMoreZombies() {
  for (var i = 0; i < 5; i++) {
    var x = random(600, 1000);
    var y = random(300, 450);
    zombie = createSprite(x, y, 20, 20);
    zombie.addImage(zombieimg);
    zombie.scale = 0.2;
    zombie.velocityX = zombieSpeed;
    zombieGroup.add(zombie);
  }
}

function shootBullet() {
  var bullet = createSprite(240, 403, 10, 10);
  bullet.scale = 0.4;
  bullet.velocityX = 5;
  bulletsGroup.add(bullet);
}
