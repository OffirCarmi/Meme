'use strict'

var gMeme = {
    selectedImgIdx: null,
    selectedLineIdx: 1,
    lines: [
        {
            txt: '',
            strokeColor: '#000000',
            fillColor: '#ffffff',
            xPos: -1000,
            yPos: -1000,

        },
        {
            txt: 'Edit text',
            size: 50,
            align: 'left',
            strokeColor: '#000000',
            fillColor: '#ffffff',
            font: 'impact',
            xPos: 0,
            yPos: 0,
        }]
}

function updateImgIdx(id) {
    gMeme.selectedImgIdx = id

}

function getMeme() {
    return gMeme
}

function setLineTxt(txt, idx) {
    gMeme.lines[idx].txt = txt
}

function setXPos(pos, idx) {
    gMeme.lines[idx].xPos = pos
}

function setYPos(pos, idx) {
    gMeme.lines[idx].yPos = pos
}

function lineDown(idx) {
    console.log('enter');
    gMeme.lines[idx].yPos += 10
    console.log(gMeme.lines[idx].yPos);

}

function lineUp(idx) {
    gMeme.lines[idx].yPos -= 10

}

function switchLine(idx) {
    gMeme.selectedLineIdx = idx

}

function addLine(idx) {
    gMeme.selectedLineIdx = idx
    gMeme.lines.push({ txt: 'Edit text', size: 50, align: 'left', strokeColor: '#000000', fillColor: '#ffffff', font: 'impact' })
}

function deleteLine(idx) {
    gMeme.lines.splice(idx)
    gMeme.selectedLineIdx = 1

}

function setBiggerFont(idx) {
    gMeme.lines[idx].size += 5
}

function setSmallerFont(idx) {
    gMeme.lines[idx].size -= 5

}

function setAlign(val, idx) {
    gMeme.lines[idx].align = val
}

function setFont(font, idx) {
    gMeme.lines[idx].font = font

}

function setStrokeColor(color, idx) {
    gMeme.lines[idx].strokeColor = color
}

function setFillColor(color, idx) {
    gMeme.lines[idx].fillColor = color
}

function deleteBorder() {
    gMeme.lines.shift()
}

function addBorder() {
    gMeme.lines.unshift({ txt: '', strokeColor: '#000000', fillColor: '#ffffff', xPos: -1000, yPos: -1000 })
}