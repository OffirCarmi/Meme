'use strict'

var gMeme = {
    selectedImgIdx: null,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Edit text', size: 50, align: 'left',
        strokeColor: '#000000', fillColor: '#ffffff',
        lineWidth: 1, font: 'impact',
        posX: 0, posY: 0
    }]
}


function updateImgIdx(id) {
    gMeme.selectedImgIdx = id

}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[gLineIdx].txt = txt
}

function switchLine() {
    const line = gMeme.selectedLineIdx
    if (line === 0) gMeme.selectedLineIdx = 1
    else gMeme.selectedLineIdx = 0
}

function addLine() {
    gMeme.selectedLineIdx++
    gMeme.lines.push({ txt: 'Edit text', size: 50, align: 'left', strokeColor: '#000000', fillColor: '#ffffff', lineWidth: 3, font: 'impact' })
}

function setBiggerFont() {
    gMeme.lines[gLineIdx].size += 5
    gMeme.lines[gLineIdx].lineWidth += 5
}


function setSmallerFont() {
    gMeme.lines[gLineIdx].size -= 5
    gMeme.lines[gLineIdx].lineWidth -= 5

}

function setAlign(val) {
    gMeme.lines[gLineIdx].align = val
}

function setFont(font) {
    gMeme.lines[gLineIdx].font = font

}

function setStrokeColor(color) {
    gMeme.lines[gLineIdx].strokeColor = color
}

function setFillColor(color) {
    gMeme.lines[gLineIdx].fillColor = color
}




