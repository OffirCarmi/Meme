'use strict'
const memeFont = new FontFace('impact', 'url(/fonts/Impact.ttf)')

var gElCanvas
var gCtx

var gIdx = 0
var gSwitchDirUp = true




function renderCanvas() {
    gElCanvas = document.querySelector('canvas')
    gElCanvas.width = 495
    gElCanvas.height = 495
    gCtx = gElCanvas.getContext('2d')

    gIdx = 1
    const meme = getMeme()
    const memeTextLine = document.querySelector('[name=text]')
    memeTextLine.addEventListener('keyup', onSetLineTxt)
    memeTextLine.value = meme.lines[gIdx].txt

    renderMeme()
}

function onSetLineTxt() {
    const txt = document.querySelector('[name=text]').value
    setLineTxt(txt, gIdx)
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
    memeImg.onload = () => {
        gCtx.drawImage(memeImg, 0, 0)
        strokedText()
    }
    renderEditOpts()
}

function renderEditOpts() {
    const meme = getMeme()
    document.querySelector('[name=text]').value = meme.lines[gIdx].txt
    document.querySelector('[name=font]').value = meme.lines[gIdx].font
    document.querySelector('[name=stroke-color]').value = meme.lines[gIdx].strokeColor
    document.querySelector('[name=fill-color]').value = meme.lines[gIdx].fillColor

}

function strokedText() {
    const meme = getMeme()

    meme.lines.forEach((line, idx) => {
        let txt = line.txt
        calcXPos(txt, idx)
        calcYPos(idx)

        // gCtx.textBaseline = 'alphabetic'
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.strokeStyle = line.strokeColor
        gCtx.lineWidth = 8
        gCtx.strokeText(txt, line.xPos, line.yPos)
        gCtx.fillStyle = line.fillColor
        gCtx.fillText(txt, line.xPos, line.yPos)

    })
    createBorder()

}

function calcXPos(txt, idx) {
    const txtWidth = gCtx.measureText(txt).width
    const canvasWidth = gElCanvas.width
    const meme = getMeme()
    let xPos = 0

    switch (meme.lines[idx].align) {
        case 'center':
            xPos = (canvasWidth - txtWidth) / 2
            break
        case 'left':
            xPos = 10
            break
        case 'right':
            xPos = canvasWidth - txtWidth - 10
            break
    }

    setXPos(xPos, idx)
    // meme.lines[gIdx].posX = gXPos
}

function calcYPos(idx) {
    const meme = getMeme()
    const canvasHeight = gElCanvas.height
    let yPos = 0

    switch (idx) {
        case 1:
            yPos = meme.lines[idx].size + 15
            break
        case 2:
            yPos = canvasHeight - 25
            break
        case 3:
            yPos = canvasHeight / 2
            break
    }
    setYPos(yPos, idx)
    // if (gIdx > 0) gYPos = gElCanvas.width - meme.lines[gIdx].size / 2
}

function createBorder() {
    if (gIdx === 0) return
    const meme = getMeme()
    const txt = meme.lines[gIdx].txt
    if (!txt) return
    const txtWidth = gCtx.measureText(txt).width
    const fontSize = meme.lines[gIdx].size
    const borderSize = { width: (txtWidth + 20), height: (fontSize + 20) }

    gCtx.save()
    gCtx.setLineDash([5, 3])
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 2
    const borderX = meme.lines[gIdx].xPos - 10
    const borderY = meme.lines[gIdx].yPos - fontSize - 5
    gCtx.strokeRect(borderX, borderY, borderSize.width, borderSize.height)
    gCtx.restore()


}

function onLineDown() {
    const meme = getMeme()
    if (meme.lines[gIdx].yPos + 10 > gElCanvas.height) return
    lineDown(gIdx)
    renderMeme()
}

function onLineUp() {
    const meme = getMeme()
    if (meme.lines[gIdx].yPos - 10 < 0) return
    lineDown(gIdx)
    renderMeme()
}

function onSwitchLine() {
    if (linesNum === 2) return

    const meme = getMeme()
    const linesNum = meme.lines.length
    if (gIdx === linesNum - 1) gSwitchDirUp = false
    else if (gIdx === 1) gSwitchDirUp = true

    if (gSwitchDirUp) gIdx++
    else gIdx--

    switchLine(gIdx)
    renderMeme()

}

function onAddLine() {
    const meme = getMeme()
    if (meme.lines.length === 4) return

    gIdx++
    addLine(gIdx)
    renderMeme()

}

function onDeleteLine() {
    if (gIdx === 0) return
    deleteLine(gIdx)
    gIdx = 1
    renderMeme()
}

function onBiggerFont() {
    setBiggerFont(gIdx)
    renderMeme()
}

function onSmallerFont() {
    setSmallerFont(gIdx)
    renderMeme()
}

function onSetAlign(val) {
    setAlign(val, gIdx)
    renderMeme()

}

function OnSetFont(font) {
    setFont(font, gIdx)
    renderMeme()

}

function onSetStrokeColor() {
    const color = document.querySelector('[name=stroke-color]').value
    setStrokeColor(color, gIdx)
    renderMeme()
}

function onSetFillColor() {
    const color = document.querySelector('[name=fill-color]').value
    setFillColor(color, gIdx)
    renderMeme()
}

function downloadCanvas(elLink) {
    // gIdx=0
    deleteBorder()

    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'myMemegen'
    addBorder()

}