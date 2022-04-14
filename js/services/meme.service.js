'use strict'

var gMeme = {
    selectedImgIdx: null,
    selectedLineIdx: 0,
    lines: [{ txt: 'Edit text', size: 50, align: 'left', strokeColor: 'black', fillColor: 'white', lineWidth: 5, font: 'impact' }]
}


function updateImgIdx(id) {
    gMeme.selectedImgIdx = id

}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[0].txt = txt
}

function setBiggerFont() {
    gMeme.lines[0].size += 5
    gMeme.lines[0].lineWidth += 5
}


function setSmallerFont() {
    gMeme.lines[0].size -= 5
    gMeme.lines[0].lineWidth -= 5

}

function setAlign(val) {
    gMeme.lines[0].align = val
}

function setFont(font) {
    gMeme.lines[0].font = font

}



