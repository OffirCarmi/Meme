'use strict'

var gMeme = {
    selectedImgIdx: null,
    selectedLineIdx: 0,
    lines: [{ txt: 'Edit text', size: 50, align: 'center', color: 'black', font:'impact' }]
}


function updateImgIdx(id) {
    gMeme.selectedImgIdx = id

}

function getMeme(){
    return gMeme
}




