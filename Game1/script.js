var canvas = document.getElementById("tutoryal");
var ctx = canvas.getContext("2d");
// var bx = (a*(blockWight+blockPadding))+blockOffsetLeft;
// var by = (b*(blockHeight+blockPadding))+blockOffsetTop;
var x = (Math.random() * (550 - 50)) + 50;
var y = 200;
var dx = 4;
var dy = 5;
var px = 225;
var py = 775;
var d = 0
var o = 0
var rightPressed = false;
var leftPressed = false;
blocks=[]
creatBlock()
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}
function drawPlatform() {
    ctx.beginPath()
    ctx.fillStyle = "green"
    ctx.fillRect(px, py, 150, 10)
    ctx.fill()
    ctx.closePath()
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPlatform();
    drawBlock();
    collision();
    ctx.fillStyle = "green"
                ctx.font = "48px serif";
  ctx.fillText(o, 10, 50)
    x += dx;
    y += dy;
    if(y>=765 && x>=px && x<=px+150 && y<800){
    dy =-dy
    d ++
    console.log(d)
    }
    if(y<0){
    dy =-dy
    }
    if(x<600){
    dx =-dx
    }
    if(x>0){
        dx =-dx
    }
    if(rightPressed && px < canvas.width-150){
        px += 3;
    }
    else if(leftPressed && px > 0){
        px -= 3;
    }
    if(y > canvas.height){
        
      alert("Ты проиграл, иди делай уроки! Твой счёт "+d)
       x = (Math.random() * (550 - 50)) + 50;
 y = 200;
 dx = 3;
 dy = 6;
 o = 0;                                                                                                                                                             
 d = 0;
      setTimeout(function(){
        creatBlock()
    },1000);
    


    }
}
function drawBlock(){
    for(var a=0; a<5; a++){
        for(var b=0; b<5; b++){
            if(blocks [a][b].draw){
                ctx.beginPath();
                ctx.rect(blocks[a][b].x,  blocks[a][b].y, 100, 30);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.closePath();
            }
            
        }
    }
}
function collision(){
    for(var a=0; a<5; a++){
        for(var b=0; b<5; b++){
            if(blocks [a][b].x<x && x<blocks [a][b].x+100 && y>blocks[a][b].y && y<blocks[a][b].y+30 && blocks[a][b].draw==true){
                o++
                
                dy =- dy
                blocks[a][b].draw=false
                if(o==25){
alert("Ты выйграл, уроки отменяются, завтра в школу не идёшь!!!")
                }
                
            }
        }
    }
}
function creatBlock(){
    bx = 10 
        by = 10
    for(var a=0; a<5; a++){

        blocks[a]=[]
        
        for(var b=0; b<5; b++){
            blocks[a][b]={x:0, y:0, draw:true}
            blocks[a][b].x = bx
            blocks[a][b].y = by
            bx += 120
            
        }
        bx = 10
        by += 40
    }
}
function keyDownHandler(e) {
    if(e.keyCode == 39){
        rightPressed = true;
    }
    else if(e.keyCode == 37){
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39){
        rightPressed = false;
    }
    else if(e.keyCode == 37){
        leftPressed = false;
    }
}


setInterval(draw, 10);