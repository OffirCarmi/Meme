'use strict'
const memeFont = new FontFace('impact', 'url(/fonts/Impact.ttf)')

var gElCanvas
var gCtx

var gIdx = 0
var gSwitchDirUp = true




function renderCanvas() {
    console.log(window.innerWidth);
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    if (window.innerWidth < 640) {
        gElCanvas.width = 200
        gElCanvas.height = 200
    } else {
        gElCanvas.width = 495
        gElCanvas.height = 495
    }

    const meme = getMeme()
    const memeTextLine = document.querySelector('[name=text]')
    memeTextLine.addEventListener('keyup', onSetLineTxt)
    memeTextLine.value = meme.lines[gIdx].txt

    renderMeme()
}

function resizeCanvas() {

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
        createBorder()
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
    // createBorder()

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

    switch (true) {
        case (idx === 0):
            yPos = meme.lines[idx].size + 15
            break
        case (idx === 1):
            yPos = canvasHeight - 25
            break
        case (idx > 1):
            yPos = canvasHeight / 2
            break
    }
    setYPos(yPos, idx)
}

function createBorder() {
    const meme = getMeme()
    if (meme.lines.length === 0 || !meme.lines[gIdx].txt) return
    const txt = meme.lines[gIdx].txt
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
    if (meme.lines[gIdx].yPos + 50 > gElCanvas.height) return
    lineDown(gIdx)
    renderMeme()
}

function onLineUp() {
    const meme = getMeme()
    if (meme.lines[gIdx].yPos - 10 < 0) return
    lineUp(gIdx)
    renderMeme()
}

function onSwitchLine() {
    const meme = getMeme()
    const linesNum = meme.lines.length
    if (linesNum <= 1) return

    if (gIdx === linesNum - 1) gSwitchDirUp = false
    else if (gIdx === 0) gSwitchDirUp = true

    if (gSwitchDirUp) gIdx++
    else gIdx--

    switchLine(gIdx)
    renderMeme()

}

function onAddLine() {
    const meme = getMeme()
    const linesNum = meme.lines.length
    if (linesNum === 0) gIdx = 0
    else gIdx++
    addLine()
    switchLine(gIdx)
    renderMeme()

}

function onDeleteLine() {
    const meme = getMeme()
    let linesNum = meme.lines.length
    if (linesNum === 0) return
    deleteLine(gIdx)
    linesNum = meme.lines.length
    if (linesNum === 0) {
        renderMeme()
        return
    }
    gIdx = 0
    switchLine(gIdx)
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
    // addlineforDownload()
    // gIdx++
    // switchLine(gIdx)
    // renderMeme()
    // gIdx=0
    // deleteBorder()

    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'myMemegen'
    // addBorder()

}