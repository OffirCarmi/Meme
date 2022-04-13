'use sticrt'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    const imgs = getImgs()
    let strHTML = imgs.map(img => {
        return `
        <img onclick="onRenderMeme(${img.id})" src="${img.url}">
        `
    })
    elGallery.innerHTML = strHTML.join('')
}