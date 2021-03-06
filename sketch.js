//Create variables here
var Dog,DogSprite;
var happyDog,HappyDogSprite;
var database;
var foodS, foodStock;

function preload()
{
  Dog = loadImage("images/dog.png");
  happyDog = loadImage("images/doghappy.png");
}

function setup() {
  createCanvas(500,500);

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
  DogSprite = createSprite(250,250);
  DogSprite.addImage(Dog);
  DogSprite.scale = 0.2;

  HappyDogSprite = createSprite(250,250);
  HappyDogSprite.scale = 0.2;
  
}


function draw() { 
  background(46, 139, 87); 

  drawSprites();
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    HappyDogSprite.addImage(happyDog);
  }
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}