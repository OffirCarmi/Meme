'use strict'

function showSaved() {
    document.querySelector('.saved-link').classList.add('active')
    document.querySelector('.gallery-link').classList.remove('active')

    const elGallery = document.querySelector('.gallery')
    const elMeme = document.querySelector('.meme')
    const elSaved = document.querySelector('.saved')
    elGallery.style.display = 'none'
    elMeme.style.display = 'none'
    elSaved.style.display = 'block'

    renderSavedImgs()
}


function renderSavedImgs() {
    const elSaved = document.querySelector('.saved-container')
    const saved = loadFromStorage('savedMemes')
    let strHTML = saved.map((save, idx) => {
        return `<img src="Images/memes/${save.selectedImgIdx}.jpg">`
    })
    elSaved.innerHTML = strHTML.join('')

}


