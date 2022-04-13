'use strict'

var gElCanvas
var gCtx
const memeFont = new FontFace('impact', 'url(/fonts/Impact.ttf)')


function renderCanvas(id) {
    const img = getImgById(id)
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
    toRender.onload = function () {
        gCtx.drawImage(toRender, 0, 0)
    }


    const txt = meme.lines[0].txt
    addText(txt, Math.floor(gElCanvas.width / 2), 50)
    document.querySelector('[name=text]').value = txt

}

function addText (txt,x,y){
    const meme = getMeme()
    const img = getImgById(meme.selectedImgIdx)
    gCtx.fillStyle = 'white'
    gCtx.font = '40px impact'
    gCtx.fillText (txt,x,y)
}

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
