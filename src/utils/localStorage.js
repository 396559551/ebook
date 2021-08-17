import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage(key,value) {
    return localStorage.set(key,value)
}
export function getLocalStorage(key) {
    return localStorage.get(key)
}
export function removeLocalStorage(key) {
    return localStorage.delete(key)
}
export function clearLocalStorage() {
    return localStorage.clear()
}

export function setBookObject(fileName,key,value) {
    let book = getLocalStorage('${fileName}-info')
    if (!book)
        book = {}
    book[key] = value
    setLocalStorage('${fileName}-info',book)
}

export function getBookObject(fileName,key) {
    let book = getLocalStorage('${fileName}-info')
    if (book)
        return book[key]
    else
        return null
}
//字体设置
export function getFontFamily(fileName) {
    return getBookObject(fileName,'fontFamily')
}

export function saveFontFamily(fileName,font) {
    return setBookObject(fileName,'fontFamilt',font)
}

//字号设置
export function getFontSize(fileName) {
  return getBookObject(fileName, 'fontSize')
}

export function saveFontSize(fileName, fontSize) {
  setBookObject(fileName, 'fontSize', fontSize)
}
//中英语言设置，我没做
export function getLocale() {
    return getLocalStorage('locale')
}

export function setLocale() {
    return setLocalStorage('locale')
}
//主题设置
export function getTheme(fileName) {
  return getBookObject(fileName, 'theme')
}

export function saveTheme(fileName, theme) {
  setBookObject(fileName, 'theme', theme)
}
//缓存阅读进度
export function getLocation(fileName) {
  return getBookObject(fileName, 'location')
}

export function saveLocation(fileName, location) {
  setBookObject(fileName, 'location', location)
}