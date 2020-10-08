// gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

// variables

var monkey , monkey_running,monkey_collided;
var ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,monkeyGroup;
var score = 0;
var survivalTime = 0;

function preload(){
  
  monkey_running=  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided = loadAnimation("sprite_6.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,600);
  

  //creating the monkey 
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.1;
  monkey.setCollider("rectangle",0,0,400,monkey.height);
  monkey.debug = false;
  
  
  //creating groups
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  
  background("white");
  
  
  // score text
  fill("black")
  textSize(20);
  text("Score " + score,180,30)
  
  //survival time text
  fill("black")
  textSize(20);
  text("SurvivalTime " + survivalTime,340,30)
  
  //creating ground
  ground = createSprite(400,350,900,10);
  ground.x=ground.width/2;
  ground.shapeColor = "silver";
  
  monkey.collide(ground);
  
  
  //play game state
  
  if(gameState===PLAY){

  // giving velocity to ground
  ground.velocityX = -4;
  ground.lifetime=100;
  
    // creating survival time
 survivalTime = survivalTime +                  Math.round(getFrameRate()/60);
    
    
    // monkey jumping system
  if(keyWentDown("space")&& monkey.y>=310){
    monkey.velocityY = -18;
  }
  
   monkey.velocityY = monkey.velocityY+0.8;
  
    // creating score increasing system
  if(FoodGroup.isTouching(monkey)){
    
    FoodGroup.destroyEach();
    score++ ;
  }
    
    
    // spawning food and obctacles
  food();
  obstacle();
    
  }
  
  //game over function
      if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
      
    }
  
  
  // END gamestate
  
  
  if(gameState===END){
    
    // cange the animation of monkey
    monkey.changeAnimation("collided", monkey_collided);
    
    
    
    

      
     //reset
    fill("black")
    textSize(20);
    text("PRESS 'R' TO RESTART ",240,180)
       if(keyWentDown("R")) {
      reset();
    }
    
     //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
     // obstacle and food velocity zero
    
     monkey.velocityY=0;
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
  }
  


  
  
  drawSprites();
  
 
}


function reset(){
  
  // reset the gamestate to PLAY
  gameState=PLAY;
  
  //destroy obstacles and food
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();

  // cange monkey animation
  monkey.changeAnimation("moving",monkey_running);
  
  //reset the score and survival time to zero
  score=0;
  survivalTime = 0;
}

function food(){
  if(World.frameCount % 80 === 0){
  banana = createSprite(600,200,20,20);
  banana.addImage(bananaImage)
  banana.scale = 0.1;  
    
  banana.y = Math.round(random(120,200));
  banana.velocityX = -6;
  banana.lifetime = 100;  
  
  FoodGroup.add(banana);
 }    
  
}

function obstacle(){
  if(World.frameCount % 300 === 0){
  var obstacle = createSprite(600,310,20,20);
  obstacle.addImage(obstaceImage)
  obstacle.scale = 0.2;  
    
  //obstacle.y = Math.round(random(120,200));
  obstacle.velocityX = -6;
  obstacle.lifetime = 100;  
  
  obstacleGroup.add(obstacle);
 }    
  
}


