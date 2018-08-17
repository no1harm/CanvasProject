/** 
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
*/
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

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
lineWidth = 5

var using = false

//设置canvas尺寸
setCanvasSize(canvas)

// 监听用户动作
listenToUser(canvas,ctx)

//启用橡皮擦/画笔
var eraserEnabled = false

pen.onclick = function() {
    eraserEnabled = false 
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function() {
    eraserEnabled = true
    pen.classList.remove('active')
    eraser.classList.add('active')
}
// 清空画板
clear.onclick = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//保存画板
download.onclick = function() {
    var url = canvas.toDataURL("img/png")
    var a = document.createElement("a")
    document.body.appendChild(a)
    a.href = url
    a.download = 'My images'
    a.target = "_blank"
    a.click()
}

function resetTargetClass (keyWord) {
    var parentNode = keyWord.target.parentNode
}
black.onclick = function(keyWord){
    ctx.strokeStyle = "black"
    // resetTargetClass(keyWord)
    black.classList.add("active")
    red.classList.remove("active")
    yellow.classList.remove("active")
    blue.classList.remove("active")
}
red.onclick = function(keyWord){
    ctx.strokeStyle = "red"
    red.classList.add("active")
    yellow.classList.remove("active")
    black.classList.remove("active")
    blue.classList.remove("active")
}
yellow.onclick = function(keyWord){
    ctx.strokeStyle = "yellow"
    yellow.classList.add("active")
    red.classList.remove("active")
    black.classList.remove("active")
    blue.classList.remove("active")
}
blue.onclick = function(keyWord){
    ctx.strokeStyle = "blue"
    blue.classList.add("active")
    yellow.classList.remove("active")
    black.classList.remove("active")
    red.classList.remove("active")
}

thin.onclick = function() {
    lineWidth = 5
}
thick.onclick = function() {
    lineWidth = 10
}

/***********************工具函数***************** */

function setCanvasSize(canvas) {
    function pageSize(){
        // 设置canvas的宽高为全屏
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
    
    pageSize()
    
    // 当用户拉伸窗口时，改变canvas的宽高
    window.onresize = function() {
        pageSize()
    }
}

function listenToUser(canvas, ctx) {
    // 确定用户点击的此刻坐标
    var lastPoint = { x: undefined, y: undefined }

    // 画圆
    function drawCir(x, y, radius) {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 360)
        ctx.fill()
    }

    // 画线
    function drawLine(x1, y1, x2, y2, ) {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineWidth = lineWidth
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.closePath()
    }

    // 特性检测
    if (document.body.ontouchstart !== undefined){
        // 如果设备支持触屏
        canvas.ontouchstart = function(keyWord) {
            
            var x = keyWord.touches[0].clientX;
            var y = keyWord.touches[0].clientY;
            
            if (eraserEnabled) {
                using = true
                ctx.clearRect(x, y, 10, 10)
            } else {
                // 确定此刻用户所点击的坐标，以配合下一个点的坐标
                using = true;
                lastPoint = { x: x, y: y }
            }
        }
        canvas.ontouchmove = function(keyWord) {
            
            var x = keyWord.touches[0].clientX;
            var y = keyWord.touches[0].clientY;
    
            if (eraserEnabled) {
                if (using) {
                    ctx.clearRect(x, y, 10, 10)
                }
            } else {
                if (using) {
                    var newPoint = { x: x, y: y }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    //这句话很重要
                    lastPoint = newPoint
                }
            }
        }
        canvas.ontouchend = function(keyWord) {
            using = false
        }
    } else {
        // 如果设备不支持触屏
        canvas.onmousedown = function (keyWord) {
            var x = keyWord.clientX;
            var y = keyWord.clientY;
            if (eraserEnabled) {
                using = true
                ctx.clearRect(x, y, 10, 10)
            } else {
                // 确定此刻用户所点击的坐标，以配合下一个点的坐标
                using = true;
                lastPoint = { x: x, y: y }
            }
        }
        canvas.onmousemove = function (keyWord) {
    
            var x = keyWord.clientX;
            var y = keyWord.clientY;
    
            if (eraserEnabled) {
                if (using) {
                    ctx.clearRect(x, y, 10, 10)
                }
            } else {
                if (using) {
                    var newPoint = { x: x, y: y }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    //这句话很重要
                    lastPoint = newPoint
                }
            }
        }
        canvas.onmouseup = function (keyWord) {
            using = false
        }
    }
}