var canvas = document.getElementById("tutoryal");
var dx = 4
var dy = 4
var ctx = canvas.getContext("2d");
var y = 200
var x = (Math.random() * (550 - 50)) + 50;
var px = 225;
var py = 600;
var rightPressed = false;
var leftPressed = false;
var d = 0
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath();
}
function drawdown(){
    if(y>canvas.height){
        dy =- dy
        d --
    }
}
function drawup(){
    if(y<0){
        dy =- dy
    }
}
function drawplatform(){
    ctx.fillRect(px, py, 120, 20)
}
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
drawdown();
drawup();
    drawBall();
    drawplatform();
    ctx.fillStyle = "green"
                ctx.font = "48px serif";
  ctx.fillText(d, 10, 50)
    y += dy;
    if(rightPressed && px < canvas.width-150){
        px += 2;
    }
    else if(leftPressed && px > 0){
        px -= 2;
    }
    if(y>=600 && x>=px && x<=px+150 && y<800){
        if(dy > 0){
            d ++
            y = 50
            x = Math.floor(Math.random() * (550 - 50 + 1)) + 50;
            console.log(d)
        }
        else{
            d --
            y = 50
            x = Math.floor(Math.random() * (550 - 50 + 1)) + 50;
        }
}
}
setInterval(draw, 10)
function keyDownHandler(e){
    if(e.keyCode == 39){
rightPressed = true
    }
    else if(e.keyCode == 37){
        leftPressed = true
    }
}
function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed = false
    }
else if(e.keyCode == 37){
    leftPressed = false 
}
}