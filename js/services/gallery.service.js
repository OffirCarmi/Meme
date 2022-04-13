'use strict'
var gImgs = _createImgs()

function getImgById(id) {
    return gImgs.find(img => img.id === id)
}

function getImgs() {
    return gImgs
}

function _createImgs() {
    const imgs = []
    for (let i = 1; i <= 18; i++) {
        imgs.push(
            {
                id: i,
                url: `Images/memes/${i}.jpg`,
                keywords: ['key1', 'key2']

            }
        )
    }
    return imgs
}