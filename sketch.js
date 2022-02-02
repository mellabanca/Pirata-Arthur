//exemplos de matrizes
var seila = [1,2,3];
//console.log(seila);

//matriz com diferentes tipos de dados
var numsei = ['Melissa', 50, true];
//console.log(numsei);

//mariz contendo outras matrizes
var esqueci = [[1,2],[3,4],[5,6]];
//console.log(esqueci);

//acessando os elementos da matriz com o índice (index)
//console.log(seila[2]);
//console.log(esqueci[1][1]);

//push e pop
numsei.push("Arthur");
//console.log(numsei);
numsei.pop();
//console.log(numsei);

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var backgroundImg;
var tower, towerImg;
var angle, cannon;
var cannonBall;
var buum = [];
var barco;

function preload() {
 backgroundImg = loadImage("./assets/background.gif");
 towerImg = loadImage("./assets/tower.png");
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height-1, width*2, 1, options);
  World.add(world,ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world,tower);

  angleMode(DEGREES);
  angle = 20;
  cannon = new Cannon(180,110,130,100,angle);

  cannonBall = new CannonBall(cannon.x, cannon.y);

  barco = new Barco(width-79, height-60, 170, 170, -80);
 
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, 1200, 600);
 
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width*2, 1);
  push();
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160, 310);
  pop();

  cannon.display();

  Matter.Body.setVelocity(barco.body, {x: -0.9, y:0});
  barco.display();

  for(var i = 0; i < buum.length; i++){
    flw(buum[i],i);
  }
   
}

function keyReleased(){
  if(keyCode === DOWN_ARROW){
    buum[buum.length - 1].shoot()
  }
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var love = new CannonBall(cannon.x, cannon.y);
    buum.push(love);
  }
}

function flw(bola, i){
  if(bola){
    bola.display();
  }
}