//save to local storage
function saveToStorage(key, val) {
    var json = JSON.stringify(val)
    localStorage.setItem(key, json)
}

//get from local storage
function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    const val = JSON.parse(json)
    return val
}