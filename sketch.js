var Play = 1;
var End = 0;
var Win = 2;
var Fight = 3;
var preGame = 4;

var gameState = 4;

var zombie, zombieImg;
var vaccine, vaccineImg;
var candy, candyImg;
var pumpkin, pumpkinImg;
var start, startImg;
var backgroundImg;
var score = 0;
var treats = 0;
var virusesKilled = 0;

function preload(){
zombieImg = loadImage("man.jpg");
candyImg = loadImage("mask.jpg");
pumpkinImg = loadImage("covid.jpg");
backgroundImg = loadImage("background1.jpg");
vaccineImg = loadImage("vaccine.png")
//startImg = loadImage("start.png")
}
function setup(){
createCanvas(1200, 400)

zombie = createSprite(100, 330, 20, 20);
zombie.addImage(zombieImg)
zombie.scale = 0.5;
zombie.velocityX = 2

vaccine = createSprite(displayWidth/2, 300, 20, 20);
 vaccine.addImage(vaccineImg)
 vaccine.scale = 0.5;

    

candyGroup = new Group();
obstaclesGroup = new Group();

ground = createSprite(2500, 380, 6000 ,10);

//start = createSprite(600, 80, 100, 50)
//start.addImage("game", startImg);
}
function draw(){

    if(gameState === Play){
        background(backgroundImg);
        score = score + 0.0001

        zombie.visible = true;

        camera.position.x = zombie.x

        console.log(zombie.y)

         vaccine.visible = false;
        food();
    obstacles();
    textSize(30)
    text("score : "  + score, zombie.x, 40);
    if(keyWentDown("space") && zombie.y > 310) {
        zombie.velocityY = -20;
       // start.visible = false;
      }
     // if(keyWentUp("space")){
      //  zombie.velocityY = 14;
   // }
    zombie.velocityY = zombie.velocityY + 0.8

    if(candyGroup.isTouching(zombie)){
        candyGroup.destroyEach();
        treats = treats + 1;
       
     }

     

     text("mask Collected :" + treats, zombie.x - 500,40)

     if(obstaclesGroup.isTouching(zombie)){
         textSize(20)
         text("GAME OVER", 550, 40)
         ground.velocityX = 0;
         obstaclesGroup.setVelocityXEach(0);
         candyGroup.setVelocityXEach(0);

         gameState = End;
         
     }
     if(treats === 3){
        gameState = Fight;

     }
     

      zombie.collide(ground);
      
  


    }else if (gameState === End){
        background(backgroundImg);
        drawSprites();
        textSize(50)
        strokeWeight(20)
        stroke("red")
        fill("blue")
        text("GAME OVER", 550,200);
        candyGroup.destroyEach();
        obstaclesGroup.destroyEach();
        zombie.visible = false;
        
        

        
    } else if (gameState === Win){
        background(backgroundImg);
        drawSprites();
        textSize(50)
        text("You win", 550,200);
        text("The man is safe", 350,250)
        
        

    } else if(gameState === Fight){

        background(backgroundImg);

        zombie.visible = false;

        camera.position.x = vaccine.x;

        obstacles();

        vaccine.visible = true;

        if(keyWentDown("up")){
            vaccine.y = vaccine.y - 10
        }

        if(keyWentDown("down")){
            vaccine.y = vaccine.y + 10
        } 

        text("Viruses killed : "  + virusesKilled, displayWidth/2, 40);
  
        if(vaccine.isTouching(obstaclesGroup)){
            obstaclesGroup.destroyEach();

            virusesKilled = virusesKilled + 1;

        }
  
        if (virusesKilled === 20){
            gameState = win
        }


    } else if(gameState = preGame){
        text("this game has two parts to it",550,50);
        text("Part 1 : dodge the virus and try to collect 3 mask",550,150);
        text("Part 2 : kill the 20 viruses and you will win",550,250);
        text("Press A to start the game",550,350);
        zombie.visible = false;
        vaccine.visible = false;
        if(keyWentDown("A")){
            gameState = Play;
        }
    }
    
    
    drawSprites();
    
   
    
    

}
function food(){
if (frameCount % 250 === 0) {
    var candy = createSprite(zombie.x + 600, random(80, 200), 20, 20)
    candy.addImage("candy", candyImg);
     candy.scale = 0.4;
     candy.velocityX = -8;

     candy.lifetime = 200;
      
      candyGroup.add(candy);
      }
    }
function obstacles(){
    if (frameCount % 150 === 0) {
      var pumpkin = createSprite(displayWidth - 200, random(40,400), 20, 20)
      pumpkin.addImage("pumpkin", pumpkinImg);
     pumpkin.scale = 0.3;
      pumpkin.velocityX = -8;
      pumpkin.lifetime = 200;
    
      obstaclesGroup.add(pumpkin)
    }

  

    }