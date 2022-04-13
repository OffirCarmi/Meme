'use strict'

var gElCanvas
var gCtx
const memeFont = new FontFace('impact', 'url(/fonts/Impact.ttf)')


function renderCanvas() {
    const elCanvas = document.querySelector('canvas')
    elCanvas.width = 495
    elCanvas.height = 495
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()

}

function renderMeme() {
    const meme = getMeme()
    const img = getImgById(meme.selectedImgIdx)

    const toRender = new Image()
    toRender.src = img.url
    toRender.onload = function() {
        gCtx.drawImage(toRender, 0, 0)
    }



}


// function drawText(lineIdx, txt, x, y) {
//     // console.log(elImg.width);
//     // console.log(elImg.height);
//     gCtx.font = `${gMeme.lines[lineIdx].size}px impact`
//     gCtx.textAlign = gMeme.lines[lineIdx].align
//     gCtx.fillStyle = 'white'
//     gCtx.lineWidth = 2
//     gCtx.strokeStyle = gMeme.lines[lineIdx].color
//     gCtx.fillText(txt, x, y)
// }

    // const txt = document.querySelector('[name=txt]').value
    // console.log(txt);

    // drawText(0, gMeme.lines[0].txt, elImg.width / 2, 55)