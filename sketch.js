var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,40,40);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.4;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background("black");
  
  if(gameState==="play"){

    if(tower.y > 400){
      tower.y = 300
    } 

   if(keyDown("space")){
     ghost.velocityY=-5;
   }

   if(keyDown("left")){
     ghost.x = ghost.x -3;
   }
   if(keyDown("right")){
    ghost.x = ghost.x +3;
  }
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }

   ghost.velocityY = ghost.velocityY +0.8;
   
   doors_climbers();

   if(ghost.y>600 || invisibleBlockGroup.isTouching(ghost)){
     gameState="end"
     ghost.destroy();
   }
   spookySound.play();
   drawSprites();
  }
  
  if(gameState==="end"){
    textSize(20);
    fill("red");
    text("Game Over",250,300);
  }
}

function doors_climbers(){ 

  if(frameCount %150 === 0){
    door = createSprite(random(100,500),10);
    door.addImage("door",doorImg);
    door.velocityY = 4;

    climber = createSprite(110,60)
    climber.addImage("climber",climberImg);
    climber.x=door.x;
    climber.velocityY=4;
    climber.scale=0.5;

    invisibleBlock = createSprite(100,70,70,10);
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY = 4;
    invisibleBlock.visible = false;

    doorsGroup.add(door);
    climbersGroup .add(climber);

    ghost.depth=door.depth;
    ghost.depth +=1;
    invisibleBlockGroup.add(invisibleBlock);
  }
}