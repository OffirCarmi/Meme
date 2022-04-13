'use sticrt'

function onInit() {
    renderGallery()
}

// function renderGallery() {
//     const elGallery = document.querySelector('.gallery-container')
//     const imgs = getImgs()
//     let strHTML = imgs.map(img => {
//         return `
//         <img onclick="onImgSelect(this,${img.id})" src="${img.url}">
//         `
//     })
//     elGallery.innerHTML = strHTML.join('')
// }

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    const imgs = getImgs()
    let strHTML = imgs.map(img => {
        return `
        <img onclick="onImgSelect(${img.id})" src="${img.url}">
        `
    })
    elGallery.innerHTML = strHTML.join('')
}

function onImgSelect(id) {
    const elGallery = document.querySelector('.gallery')
    const elMeme = document.querySelector('.meme')
    elGallery.style.display = 'none'
    elMeme.style.display = 'block'
    updateImgIdx(id)
    renderCanvas()

}