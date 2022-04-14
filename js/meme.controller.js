'use strict'
const memeFont = new FontFace('impact', 'url(/fonts/Impact.ttf)')

var gElCanvas
var gCtx
var gXPos
var gYPos
var gLineIdx



function renderCanvas(id) {
    const img = getImgById(id)
    const meme = getMeme()
    gElCanvas = document.querySelector('canvas')
    gElCanvas.width = 495
    gElCanvas.height = 495
    gCtx = gElCanvas.getContext('2d')
    const elInput = document.querySelector('[name=text]')
    elInput.addEventListener('keyup', onSetLineTxt)

    gLineIdx = 0

    document.querySelector('[name=text]').value = meme.lines[gLineIdx].txt
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
    const meme = getMeme()
    const img = getImgById(meme.selectedImgIdx)

    const memeImg = new Image()
    memeImg.src = img.url
    memeImg.onload = function () {
        gCtx.drawImage(memeImg, 0, 0)
        strokedText()
        createBorder()

    }

}

function strokedText() {
    const meme = getMeme()

    meme.lines.forEach(line => {
        const txt = line.txt
        calcXPos(txt)
        calcYPos()


        gCtx.font = `${line.size}px ${line.font}`
        gCtx.strokeStyle = line.strokeColor
        gCtx.lineWidth = 8
        gCtx.strokeText(txt, line.posX, line.posY)
        gCtx.fillStyle = line.fillColor
        gCtx.fillText(txt, line.posX, line.posY)

    })
    createBorder()

}

function createBorder() {

    const memeData = getMeme()
    const txt = memeData.lines[gLineIdx].txt
    if (!txt) return
    const txtWidth = gCtx.measureText(txt).width
    const fontSize = memeData.lines[gLineIdx].size
    const textBorder = { width: (txtWidth + 10), height: (fontSize + 10) }
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 2
    gCtx.strokeRect(gXPos, gYPos - fontSize, textBorder.width, textBorder.height)

}

function onSetLineTxt() {
    const txt = document.querySelector('[name=text]').value
    setLineTxt(txt)
    renderMeme()

}

function onSwitchLine() {
    const meme = getMeme()
    if (!meme.lines[1]) return

    switchLine()
    if (gLineIdx === 0) gLineIdx = 1
    else gLineIdx = 0
    renderMeme()
    renderEditOpts()


}

function onAddLine() {
    if (gLineIdx === 1) return
    addLine()
    renderMeme()
    gLineIdx++
    renderEditOpts()

}

function renderEditOpts() {
    const meme = getMeme()
    document.querySelector('[name=text]').value = meme.lines[gLineIdx].txt
    document.querySelector('[name=font]').value = meme.lines[gLineIdx].font
    document.querySelector('[name=stroke-color]').value = meme.lines[gLineIdx].strokeColor
    document.querySelector('[name=fill-color]').value = meme.lines[gLineIdx].fillColor

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
    switch (meme.lines[gLineIdx].align) {
        case 'center':
            gXPos = (canvasWidth - txtWidth) / 2
            break
        case 'left':
            gXPos = 0
            break
        case 'right':
            gXPos = (canvasWidth - txtWidth)
            break
    }

    meme.lines[gLineIdx].posX = gXPos

}

function calcYPos() {
    const meme = getMeme()
    gYPos = meme.lines[gLineIdx].size + 15
    if (gLineIdx > 0) gYPos = gElCanvas.width - meme.lines[gLineIdx].size / 2
    meme.lines[gLineIdx].posY = gYPos

}



function OnSetFont(font) {
    setFont(font)
    renderMeme()

}

function onSetStrokeColor() {
    const color = document.querySelector('[name=stroke-color]').value
    setStrokeColor(color)
    renderMeme()
}


function onSetFillColor() {
    const color = document.querySelector('[name=fill-color]').value
    setFillColor(color)
    renderMeme()
}

function downloadCanvas(elLink) {

    const meme = getMeme()
    const img = getImgById(meme.selectedImgIdx)
    const memeImg = new Image()
    memeImg.src = img.url
    memeImg.onload = function () {
        gCtx.drawImage(memeImg, 0, 0)
        strokedText()
    }


    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'myMemegen'
}