var maze1,maze2,maze3,maze4;
var character,charup,chardown,charleft,charright;
var door,doorImg1,doorImg2;
var door_key,keyImage;
var PLAY = 1;
var END = 0;
var edges;
var timer = 8 ;
var gameState;


function preload(){

    doorImg1 = loadImage("images/door1.PNG");

    doorImg2 = loadImage("images/door2.PNG");

    keyImage = loadImage("images/key.png");

    charup  = loadAnimation("images/up0.png","images/up1.png","images/up2.png","images/up3.png");

    chardown = loadAnimation("images/front0.png","images/front1.png","images/front2.png","images/front3.png");

    charleft = loadAnimation("images/left0.png","images/left1.png","images/left2.png","images/left3.png");

    charright = loadAnimation("images/right0.png","images/right1.png","images/right2.png","images/right3.png")
}

function setup(){

    createCanvas(displayWidth-40,displayHeight-40); 

    character = createSprite(displayWidth/2-700,displayHeight/2+200,50,50);
    character.addAnimation("boy down",chardown);
    character.addAnimation("boy up",charup);
    character.addAnimation("boy left",charleft);
    character.addAnimation("boy right",charright);

    maze1 = createSprite(displayWidth/2,displayHeight/2,6,600);
    maze2 = createSprite(displayWidth/2-100,displayHeight/4,500,6);
    maze3 = createSprite(displayWidth/2+100,displayHeight/2-100,500,6);
    maze4 = createSprite(displayWidth/2,displayHeight/2-100+300,500,6);

    door_key = createSprite(displayWidth/2+40,displayHeight/2-60,25,25);
    door_key.addImage(keyImage);
    door_key.rotation = 180;
    door_key.scale = 0.5;
    door_key.rotateToDirection = true;

    door = createSprite(displayWidth/2+600,displayHeight/10,30,30);
    door.addImage(doorImg1);
    door.scale = 0.5;
    door.visible = false;

    edges = createEdgeSprites();
}

function draw(){

   console.log(gameState)

    if(gameState === undefined){
        
        console.log("check0");
        welcomePage();

        if(keyDown('S') && gameState === undefined){
   
            gameState = PLAY;

        }
    }

    if(gameState === PLAY){
       
        background('white');

        textAlign(LEFT,TOP);
        textSize(25)
        text("Time left to procure the key : " + timer, displayWidth/10,displayHeight/14)
        
        door_key.rotation = door_key.rotation + 5;

          console.log(character.x) 

        if(keyDown(UP_ARROW)){
             character.changeAnimation("boy up",charup);
             character. y = character.y - 8;
                  
          }
        if(keyDown(DOWN_ARROW)){
             character.changeAnimation("boy down",chardown);
             character. y = character.y + 8;
        }
        if(keyDown(LEFT_ARROW)){
            character.changeAnimation("boy left",charleft);
            character.x = character.x - 8;

        }
        if(keyDown(RIGHT_ARROW)){
           character.changeAnimation("boy right",charright);
           character.x = character.x + 8;
        }
        
        if(character.isTouching(door_key)){
            door_key.destroy();
            door.visible = true;
        }
        
        character.collide(edges);

        if (frameCount % 60 == 0 && timer > 0){
            timer--;
        }
        if (timer == 0){
            door_key.destroy();
            gameState = END;
            clear();
            textSize(25);
            text("Press 'R' to restart", displayWidth/2-300,displayHeight/2);  
        }
         
         drawSprites();
  
    }
    if(keyDown('R') && gameState === END){
   
          gameState = undefined;

    }
 
}

function welcomePage(){

    background('lightblue');
        textSize(30)
        fill('black')
        text ('Welcome to the Maze Game',displayWidth/2-150,displayHeight/4);
        textSize(20)
        text('Press S to start the Game',displayWidth/2-80,displayHeight/3);
}


