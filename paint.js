function draw() {
    let isPaint = false
    let useEraser = false
    let isKeydown = false
    let canvas = document.querySelector("#canvas")
    let eraser = document.querySelector("#eraser")
    let clear = document.querySelector("#clear")
    let pen = document.querySelector("#pen")
    let red = document.querySelector(".red")
    let blue = document.querySelector(".blue")
    let green = document.querySelector(".green")
    let startPoint = {},endPoint = {},ctx
    if (canvas.getContext)
        ctx = canvas.getContext("2d")

    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = (event) => {
            startPoint.x = event.touches[0].clientX
            startPoint.y = event.touches[0].clientY
            isKeydown = true
        }
        canvas.ontouchmove = (event) => {
            if (isPaint && isKeydown) {

                endPoint.x = event.touches[0].clientX
                endPoint.y = event.touches[0].clientY
                ctx.beginPath()
                ctx.moveTo(startPoint.x,startPoint.y)
                ctx.lineWidth = 3
                ctx.lineTo(endPoint.x,endPoint.y)
                ctx.stroke();
                ctx.closePath();
                startPoint.x = endPoint.x
                startPoint.y = endPoint.y
            }
            if (useEraser && isKeydown) {
                ctx.clearRect(event.touches[0].clientX - 5,event.touches[0].clientY - 5,10,10)
            }

        }
        canvas.ontouchend = (event) => {
            isKeydown = false
        }
    } else {
        canvas.onmousedown = (event) => {
            startPoint.x = event.clientX
            startPoint.y = event.clientY
            isKeydown = true
        }
        canvas.onmousemove = (event) => {

            if (isPaint && isKeydown) {

                endPoint.x = event.clientX
                endPoint.y = event.clientY
                ctx.beginPath()
                ctx.moveTo(startPoint.x,startPoint.y)
                ctx.lineWidth = 3
                ctx.lineTo(endPoint.x,endPoint.y)
                ctx.stroke();
                ctx.closePath();
                startPoint.x = endPoint.x
                startPoint.y = endPoint.y
            }
            if (useEraser && isKeydown) {
                ctx.clearRect(event.x - 5,event.y - 5,10,10)
            }

        }
        canvas.onmouseup = (event) => {
            isKeydown = false
        }
    }


    eraser.onclick = function (event) {
        useEraser = true
        isPaint = false
        event.target.classList.add("active")
        pen.classList.remove("active")
    }
    pen.onclick = (event) => {
        isPaint = true
        useEraser = false
        event.target.classList.add("active")
        eraser.classList.remove("active")
    }
    clear.onclick = (event) => {
        ctx.clearRect(0,0,canvas.width,canvas.height)
        eraser.classList.remove("active")
        pen.classList.remove("active")
        isPaint = false
        useEraser = false
    }
    red.onclick = (event) => {
        ctx.strokeStyle = "red"
        event.target.classList.add("active")
        green.classList.remove("active")
        blue.classList.remove("active")
    }
    green.onclick = (event) => {
        ctx.strokeStyle = "green"
        event.target.classList.add("active")
        red.classList.remove("active")
        blue.classList.remove("active")
    }
    blue.onclick = (event) => {
        ctx.strokeStyle = "blue"
        event.target.classList.add("active")
        green.classList.remove("active")
        red.classList.remove("active")
    }
}

draw()