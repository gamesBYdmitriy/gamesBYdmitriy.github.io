var tickNumber = 0;
var canvas = document.getElementById("Zmeya");
console.log(canvas);
var ctx = canvas.getContext("2d")
var squareSize = 30;
var timer = null;
var counter = 0;
var pole = [
    "####################",
    "#                  #",
    "#                  #",
    "#                  #",
    "#                  #",
    "#       ####       #",
    "#                  #",
    "#             #    #",
    "#  #         ###   #",
    "#   #         #    #",
    "#    #             #",
    "#     #            #",
    "#                  #",
    "#                  #",
    "#                  #",
    "#       ####       #",
    "#                  #",
    "#    #             #",
    "#   ###         #  #",
    "#    #         #   #",
    "#             #    #",
    "#            #     #",
    "#                  #",
    "#                  #",
    "#                  #",
    "#                  #",
    "####################",
]
var fruit = [
    {x:1, y:1},
    {x:8, y:6},
    {x:1, y:8},
    
]
function isFruit(location){
    for(var FruitNumber = 0; FruitNumber<fruit.length; FruitNumber++){
        let secondFruit = fruit[FruitNumber]
        if(location.x == secondFruit.x && location.y == secondFruit.y){
            counter += 1
            console.log("хрум, хрум..."+counter)
            fruit.splice(FruitNumber, 1)
            snake.parts.unshift(location)
        }
    }
}
function isSnake(location){
for(var snakeNumber = 0; snakeNumber<snake.parts.length; snakeNumber++){
    let secondSnake = snake.parts[snakeNumber]
    if(location.x == secondSnake.x && location.y == secondSnake.y){
        console.log(location.x, secondSnake.x, location.y, secondSnake.y)
        return true
    }
}
console.log(false)
return false
}
function atFruit(){
    let fruitX = Math.floor(Math.random() * (18 - 0)) + 0
    let fruitY = Math.floor(Math.random() * (24 - 0)) + 0
    let location = {x:fruitX, y:fruitY};
    if(pole[location.y][location.x] ==" "){
        fruit.push(location);
    }
}
window.addEventListener("keypress",gameControl, false)
var snake ={
    parts:[
        {x: 2, y: 4}, 
        {x: 3, y: 4},
        {x: 4, y: 4}

    ],
    facing:"Ew",
    move: function(){
        let location
        if(snake.facing == "E"){
            location = {x: snake.parts[0].x+1, y: snake.parts[0].y}
        }
        else if(snake.facing =="W"){
            location = {x: snake.parts[0].x-1, y: snake.parts[0].y} 
        }
        else if(snake.facing == "N"){
            location = {x: snake.parts[0].x, y: snake.parts[0].y-1} 
        }
        else if(snake.facing == "S"){
            location = {x: snake.parts[0].x, y: snake.parts[0].y+1} 
        }

        if(pole[location.y][location.x] == "#" || isSnake(location)){
            alert("проиграл! счёт:"+counter)
            counter = 0;
            fruit = [
                {x:1, y:1},
                {x:8, y:6},
                {x:1, y:8}
            ];
            snake.parts=[
                    {x: 2, y: 4}, 
                    {x: 3, y: 4},
                    {x: 4, y: 4}
                ]
        }
        if(pole[location.y][location.x] ==" "){
            snake.parts.unshift(location)
            snake.parts.pop();
        }
            isFruit(location);
            drawSnake();
    }
    }
    function tick(){
        window.clearTimeout(timer);
        tickNumber++;
        if(tickNumber%10==0){
            atFruit();
        }
        draw();
        
            timer = window.setTimeout("tick()", 400);
       
    }
    function gameControl(keyPressed){
        var key = keyPressed.key.toLowerCase();
        targetDirection = snake.facing
        if(key == "w" && snake.facing != "S") targetDirection ="N";
        if(key == "a" && snake.facing != "E") targetDirection ="W";
        if(key == "s" && snake.facing != "N") targetDirection ="S";
        if(key == "d" && snake.facing != "W") targetDirection ="E";
        snake.facing = targetDirection
        tick(); 
        }
function drawSnake(){
    snake.parts.forEach(function drawParts(part){
    var partXlocation = part.x * squareSize
    var partYlocation = part.y * squareSize
    ctx.fillStyle ="green";
    ctx.fillRect(partXlocation, partYlocation, squareSize, squareSize);
    });
}
function drawFruits(){
    fruit.forEach(function drawFruit(fruit){
        let fruitX = fruit.x*squareSize
        let fruitY = fruit.y*squareSize
        ctx.fillStyle ="orange";
        ctx.fillRect(fruitX, fruitY, squareSize, squareSize)
    })      
}
function drawPole(){
    var yPole = 0
    pole.forEach(function checkLine(line){
        line = line.split("")
        var xPole = 0
        line.forEach(function checkChar(char){
            if(char =="#"){
                ctx.fillStyle ="black"
                ctx.fillRect(xPole, yPole, 30, 30)
            }
            xPole += 30
        })
        yPole += 30
    })
}
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPole();
    drawFruits();
    snake.move();
    ctx.font = "48px serif";
    ctx.fillText(counter, 300, 80)
}
tick();
