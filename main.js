
var canvas = document.getElementById('canvasDiv')

canvas.onmousedown = function(keyWord) {
    var x = keyWord.clientX
    var y = keyWord.clientY
    var newDiv = document.createElement("div")
    newDiv.style = "left:" + (x-3) + "px;" + "top: " + (y-3) + "px;"
    newDiv.className = "newDiv"
    canvas.appendChild(newDiv)
}