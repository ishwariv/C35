var ball;
var position, database;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database=firebase.database();
    var locNode=database.ref("Ball/Positions");
    locNode.on("value",readOp,ShowErr);
}

function draw(){
    background("white");
    if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
}

function writePosition(x,y){
   // ball.x = ball.x + x;
   // ball.y = ball.y + y;
   database.ref("Ball/Positions").set({
       x: ball.x + x,
       y: ball.y + y
   });   
}

function readOp(data){
    position=data.val();
    ball.x=position.x;
    ball.y=position.y;
}

function ShowErr(){
    console.log("error:");
}