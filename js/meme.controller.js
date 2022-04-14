'use strict'
const memeFont = new FontFace('impact', 'url(/fonts/Impact.ttf)')

var gElCanvas
var gCtx
var gTextBorder
var gXPos
var gYPos

// var gPos = {x,y}


function renderCanvas(id) {
    const img = getImgById(id)
    const meme = getMeme()
    gElCanvas = document.querySelector('canvas')
    gElCanvas.width = 495
    gElCanvas.height = 495
    gCtx = gElCanvas.getContext('2d')
    const elInput = document.querySelector('[name=text]')
    elInput.addEventListener('keyup', onSetLineTxt)

    document.querySelector('[name=text]').value = meme.lines[0].txt
    renderMeme()

}

// function addListeners() {
//     addMouseListeners()
//     addTouchListeners()
//     window.addEventListener('resize', () => {
//         resizeCanvas()
//         renderCanvas()
//     })
// }

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mouseup', onUp)
// }
// function addKeyListeners() {
//     gElCanvas.addEventListener('keyup', onMove)
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchend', onUp)
// }
// function addTouchListeners() {
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchend', onUp)
// }


function renderMeme() {
    const memeData = getMeme()
    const img = getImgById(memeData.selectedImgIdx)

    const meme = new Image()
    meme.src = img.url
    meme.onload = function () {
        gCtx.drawImage(meme, 0, 0)
        strokedText()
    }

}

function strokedText() {
    const memeData = getMeme()
    const txt = memeData.lines[0].txt
    const txtWidth = gCtx.measureText(txt).width
    const canvasWidth = gElCanvas.width

    console.log(txtWidth);
    console.log(canvasWidth);
    calcXPos(txt)
    calcYPos()

    gCtx.font = `${memeData.lines[0].size}px ${memeData.lines[0].font}`
    gCtx.strokeStyle = memeData.lines[0].strokeColor
    gCtx.lineWidth = 8
    gCtx.strokeText(txt, gXPos, gYPos)
    gCtx.fillStyle = memeData.lines[0].fillColor
    gCtx.fillText(txt, gXPos, gYPos)


}

function createBorder(txt) {
    if (!txt) return
    gTextBorder = { width: (gCtx.measureText(txt).width + 20), height: (memeData.lines[0].size + 15) }
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 5
    gCtx.strokeRect(10, 10, gTextBorder.width, gTextBorder.height)

}

function onSetLineTxt() {
    const txt = document.querySelector('[name=text]').value
    setLineTxt(txt)
    renderMeme()
}

function onBiggerFont() {
    setBiggerFont()
    renderMeme()
}


function onSmallerFont() {
    setSmallerFont()
    renderMeme()
}

function onSetAlign(val) {
    setAlign(val)
    renderMeme()

}

function calcXPos(txt) {
    const txtWidth = gCtx.measureText(txt).width
    const canvasWidth = gElCanvas.width
    const meme = getMeme()
    switch (meme.lines[0].align) {
        case 'center':
            gXPos = (canvasWidth - txtWidth) / 2
            break
        case 'left':
            gXPos = 20
            break
        case 'right':
            gXPos = (canvasWidth - txtWidth) - 20
            break
    }

}

function calcYPos() {
    const meme = getMeme()
    gYPos = meme.lines[0].size + 15

}



function OnSetFont(font) {
    setFont(font)
    renderMeme()

}

// function openColorPicker(elBtn) {
// console.log(elBtn);
// const strHtml = '<input type="color"></input>'
// elBtn.innerHTML = strHtml
// }

// function addText(txt, x, y) {
//     const meme = getMeme()
//     const img = getImgById(meme.selectedImgIdx)
//     gCtx.fillStyle = 'white'
//     gCtx.font = '40px impact'
//     gCtx.fillText(txt, x, y)
// }


// function downloadCanvas(elLink) {
//     const data = gElCanvas.toDataURL()
//     elLink.href = data
//     elLink.download = 'memegen'
// }



// function drawStroked(text, x, y) {
//     gCtx.font = '80px Sans-serif';
//     gCtx.strokeStyle = 'black';
//     gCtx.lineWidth = 8;
//     gCtx.strokeText(text, x, y);
//     gCtx.fillStyle = 'white';
//     gCtx.fillText(text, x, y);
// }


// drawStroked("37°", 50, 150);





// function drawText(txt, x, y) {
//     const meme = getMeme()
//     // console.log(meme);
//     // console.log(txt);
//     // console.log(x);
//     // console.log(y);
//     gCtx.font = `${meme.lines[0].size}px impact`
//     gCtx.textAlign = meme.lines[0].align
//     gCtx.fillStyle = 'white'
//     // gCtx.lineWidth = 2
//     gCtx.strokeStyle = meme.lines[0].color
//     gCtx.fillText(txt, x, y)
// }
