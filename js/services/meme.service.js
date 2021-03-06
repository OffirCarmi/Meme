'use strict'
var savedMemes = []

var gMeme = {
    selectedImgIdx: null,
    selectedLineIdx: 0,
    lines: [
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
    gMeme.lines[idx].yPos -= 20

}

function lineUp(idx) {
    gMeme.lines[idx].yPos += 20

}

function switchLine(idx) {
    gMeme.selectedLineIdx = idx

}

function addLine() {
    gMeme.lines.push({ txt: 'Edit text', size: 50, align: 'left', strokeColor: '#000000', fillColor: '#ffffff', font: 'impact' })

}

function deleteLine(idx) {
    gMeme.lines.splice(idx, 1)

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

function saveMeme() {
    savedMemes = (!loadFromStorage('savedMemes')) ? [] : loadFromStorage('savedMemes')
    savedMemes.push(gMeme)
    saveToStorage('savedMemes', savedMemes)

}

function addlineforDownload() {
    gMeme.lines.push({ txt: '\'', size: 50, align: 'left', strokeColor: '#000000', fillColor: '#ffffff', font: 'impact' })
}

function deleteBorder() {
    gMeme.lines.shift()
}

function addBorder() {
    gMeme.lines.unshift({ txt: '', strokeColor: '#000000', fillColor: '#ffffff', xPos: -1000, yPos: -1000 })
}