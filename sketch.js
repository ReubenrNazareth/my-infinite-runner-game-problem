var galaxy,galaxyImg;
var rocket,rocketImg;
var asteroid, asteroidImg, asteroidGroup;
var star, starImg, starGroup;
var endImg, gameEnd, restart, restartImg;
var gameState = "play"

function preload(){
  galaxyImg = loadImage("background.png");
    rocketImg = loadImage("player.png");
    asteroidImg = loadImage("obstacle.png");
    starImg = loadImage("points.png");
    endImg = loadImage("over.png");
   restartImg = loadImage("download.png");
}

function setup(){
  createCanvas(600,600);
  galaxy = createSprite(300,300);
  galaxy.addImage("galaxy", galaxyImg);
  galaxy.velocityY =2;
  galaxy.scale =2;
  
  asteroidGroup = new Group();
 starGroup = new Group();


  rocket = createSprite(510,510,10,20);
  rocket.addImage("rocket", rocketImg);
  rocket.scale =0.35;

  restart = createSprite(300,300,10,10);
  restart.addImage("restart", restartImg);
 }

function draw(){
  background(0);

   if (gameState === "play") {
    restart.visible = false

      if(keyDown("left_arrow")){
      rocket.x = rocket.x - 3;
    }
    
    if(keyDown("right_arrow")){
      rocket.x = rocket.x + 3;
    }
    
    if(keyDown("space")){
      rocket.velocityY = -10;
    }
    
    rocket.velocityY = rocket.velocityY + 0.8
    
    if(galaxy.y > 400){
      galaxy.y = 300
    }
      spawnAsteroids();


    if(asteroidGroup.isTouching(rocket)){
    rocket.velocityY = 0;
    }
    if( rocket.y > 600 || asteroidGroup.isTouching(rocket) ){
      rocket.destroy();
      gameState = "end"
      restart.visible = true;
    }
    
  }
  
  if (gameState === "end"){
    if(mousePressedOver(restart)) {
      reset();
    }


  
  }
    drawSprites();

}

function spawnAsteroids() {
  if (frameCount % 240 === 0) {
    var asteroid = createSprite(200, -50);
   
    
    asteroid.x = Math.round(random(120,400));
   
    
   asteroid.addImage(asteroidImg);
 
    
   asteroid.velocityY = 1;
  
    
  rocket.depth = asteroid.depth;
    rocket.depth +=1;
   
 
    asteroid.lifetime = 800;
  
    
   
     asteroidGroup.add(asteroid);
     asteroid.scale = 0.5;
  }
}

function reset(){
   gameState = "play"
   asteroidGroup.destroyEach () ;
   score = 0;
   distance = 0;
}

