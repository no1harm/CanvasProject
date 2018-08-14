
var canvasDiv = document.getElementById('canvasDiv')

var painting = false

//鼠标点下
canvasDiv.onmousedown = function(keyWord) {
    painting = true
    var x = keyWord.clientX
    var y = keyWord.clientY
    var newDiv = document.createElement("div")
    newDiv.style = "left:" + (x-3) + "px;" + "top: " + (y-3) + "px;"
    newDiv.className = "newDiv"
    canvasDiv.appendChild(newDiv)
}

// 鼠标移动
canvasDiv.onmousemove = function(keyWord) {
    if (painting) {
        var x = keyWord.clientX
        var y = keyWord.clientY
        var newDiv = document.createElement("div")
        newDiv.style = "left:" + (x-3) + "px;" + "top: " + (y-3) + "px;"
        newDiv.className = "newDiv"
        canvasDiv.appendChild(newDiv)
    }
}

canvasDiv.onmouseup = function(keyWord){
    painting = false
}

//canvas


// // 矩形
// ctx.fillStyle = "white"
// ctx.fillRect(0,0,20,20)

// // 三角形
// ctx.beginPath()
// ctx.fillStyle = "white"
// ctx.moveTo(75, 50);
// ctx.lineTo(100, 50);
// ctx.lineTo(100, 75);
// ctx.fill();

// // 圆形
// ctx.beginPath()
// ctx.arc(150,150,10,0,360)
// ctx.fill()

// // stroke 描边 fill 填充

var painting2 = false
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var lastPoint = {x: undefined, y: undefined}

function drawCir(x,y,radius) {
    ctx.beginPath()
    ctx.arc(x,y,radius,0,360)
    ctx.fill()
}

function drawLine (x1,y1,x2,y2,) {
    ctx.beginPath()
    ctx.strokeStyle = "yellow"
    ctx.moveTo(x1,y1)
    ctx.lineWidth = 2
    ctx.lineTo(x2,y2)
    ctx.stroke()
    ctx.closePath()
}

canvas.onmousedown = function(keyWord) {
    painting2 = true;
    var x = keyWord.clientX;
    var y = keyWord.clientY;
    lastPoint = {x:x,y:y}
    drawCir(x,y,2)
}
canvas.onmousemove = function(keyWord) {
    if (painting2) {
        var x = keyWord.clientX;
        var y = keyWord.clientY;
        var newPoint = {x:x,y:y}
        drawCir(x,y,2)
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        //这句话很重要
        lastPoint = newPoint
    }
}
canvas.onmouseup = function(keyWord) {
    painting2 = false
}