'use sticrt'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    const imgs = getImgs()
    let strHTML = imgs.map(img => {
        return `<img onclick="onImgSelect(${img.id})" src="${img.url}">`
    })
    elGallery.innerHTML = strHTML.join('')

}

function onImgSelect(id) {
    const elGallery = document.querySelector('.gallery')
    elGallery.style.display = 'none'
    document.querySelector('.gallery-link').classList.remove('active')
    const elMeme = document.querySelector('.meme')
    elMeme.style.display = 'block'

    updateImgIdx(id)
    renderCanvas()
}

function showGallery(elLink) {
    document.querySelector('.gallery-link').classList.add('active')
    const elGallery = document.querySelector('.gallery')
    const elMeme = document.querySelector('.meme')
    elGallery.style.display = 'block'
    elMeme.style.display = 'none'
}

function toggleMenu() {
    document.body.classList.toggle ('menu-open')

}