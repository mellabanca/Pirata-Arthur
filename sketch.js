const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];

var score = 0;

var naviosAnimation = [];
var naviosDados, naviosSpriteSheet;

var rachadoAnimation=[];
var rachadoDados,rachadoSpriteSheet;

var aguaAnimation = [];
var aguaDados,aguaSpriteSheet;

var seraqueacabou = false;



function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  naviosDados = loadJSON("./assets/boat/boat.json");
  naviosSpriteSheet = loadImage("./assets/boat/boat.png");
  rachadoDados=loadJSON("./assets/boat/brokenBoat.json");
  rachadoSpriteSheet=loadImage("./assets/boat/brokenBoat.png");
  aguaDados = loadJSON("./assets/waterSplash/waterSplash.json");
  aguaSpriteSheet = loadImage("./assets/waterSplash/waterSplash.png");
}



function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15


  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);

  var naviosFrames = naviosDados.frames;

  for (var i = 0; i < naviosFrames.length; i++){
    var pos = naviosFrames[i].position;
    var img = naviosSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    naviosAnimation.push(img);
  }
  var rachadoFrames = rachadoDados.frames;

  for (var i = 0; i < rachadoFrames.length; i++){
    var pos = rachadoFrames[i].position;
    var img = rachadoSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    rachadoAnimation.push(img);
  }

  var aguaFrames = aguaDados.frames;

  for (var i = 0; i < aguaFrames.length; i++){
    var pos = aguaFrames[i].position;
    var img = aguaSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    aguaAnimation.push(img);
  }
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  push();
  translate(tower.position.x, tower.position.y);
  rotate(tower.angle);
  imageMode(CENTER);
  image(towerImage, 0, 0, 160, 310);
  pop();

  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionWithBoat(i);
  }

  cannon.display();


}

function collisionWithBoat(index) {
  for (var i = 0; i < boats.length; i++) {
    if (balls[index] !== undefined && boats[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);

      if (collision.collided) {
        boats[i].remove(i);

        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      ball.remove(index);
    }
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position, naviosAnimation);

      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        });

        boats[i].display();
        boats[i].animate();
        var collision = Matter.SAT.collides(tower, boats[i].body);
        if(collision.collided && !boats[i].rachado){
          seraqueacabou = true;
          gameOver();
        }
      }
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60, naviosAnimation);
    boats.push(boat);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function gameOver(){
  swal(
  {
    title: "SEFERROU OTARIO",
    text: "VALEU POR JOGAR, FERA",
    imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize: "150x150",
    confirmButtonText: "Jogar Novamente"
  },
  function(botaoPressionado){
    if(botaoPressionado){
      location.reload();
    }
  }
  );
}
